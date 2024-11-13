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

    // Fetch the user by userId
    const user = await prisma.user.findUnique({
      where: { userId: parseInt(userId, 10) },
      select: {
        userId: true, // Use "userId" as specified in the schema
        name: true,
        email: true,
        phone: true,
        roleId: true,
        profilePic: true,
        document: true,
        dateJoined: true,
        role: {
          select: {
            roleName: true
          }
        },
      }
    });

    if (!user) {
      return { statusCode: 404, body: { error: 'User not found' } };
    }

    return { statusCode: 200, body: user };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { statusCode: 500, body: { error: 'Error fetching user details' } };
  }
});
