import { PrismaClient } from '@prisma/client';
import { defineEventHandler, getRouterParam } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Extract userId from URL params
    const userId = getRouterParam(event, 'userId');
    
    if (!userId) {
      return { statusCode: 400, body: { error: 'User ID is required' } };
    }

    // Fetch the user by ID
    const user = await prisma.user.findUnique({
      where: { userId: parseInt(userId, 10) },
      select: {
        userId: true,
        name: true,
        email: true,
        phone: true,
        roleId: true,
        profilePic: true,
        dateJoined: true,
        role: {
          select: {
            roleName: true
          }
        },
        // Exclude sensitive information like password
        // Include other fields as needed
      }
    });

    if (!user) {
      return { statusCode: 404, body: { error: 'User not found' } };
    }

    // Transform the user data if needed
    const userResponse = {
      ...user,
      roleName: user.role.roleName,
      role: undefined // Remove the nested role object
    };

    return { statusCode: 200, body: userResponse };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { statusCode: 500, body: { error: 'Error fetching user details' } };
  }
});