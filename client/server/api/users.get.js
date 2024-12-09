import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany({
      where: {
        roleId: {
          not: 3 // Assuming roleId 3 is for admin users
        }
      },
      select: {
        userId: true,
        name: true,
        email: true,
        profilePic: true,
        document: true,
        dateJoined: true,
        verified: true,
        role: {
          select: {
            roleName: true,
            roleId: true
          }
        }
      }
    })

    // Transform the data to match the expected format
    const transformedUsers = users.map(user => ({
      userId: user.userId,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      document: user.document,
      dateJoined: user.dateJoined,
      verified: user.verified,
      role: {
        roleName: user.role.roleName,
        roleId: user.role.roleId
      }
    }))

    return transformedUsers

  } catch (error) {
    console.error('Error fetching users:', error)
    event.res.statusCode = 500
    return { error: 'Internal Server Error' }
  } finally {
    await prisma.$disconnect()
  }
})