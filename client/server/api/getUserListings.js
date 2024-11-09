import { PrismaClient } from '@prisma/client';
import { defineEventHandler } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const userId = event.req.headers['x-user-id'];

  if (!userId) {
    return {
      statusCode: 401,
      body: { message: 'Unauthorized: User ID is required' },
    };
  }

  try {
    const listings = await prisma.listing.findMany({
      where: { userId: parseInt(userId) },
      include: {
        images: true, // Ensure images are included
      },
    });

    return listings;
  } catch (error) {
    console.error('Error fetching user listings:', error);
    return {
      statusCode: 500,
      body: { message: 'Failed to fetch user listings' },
    };
  }
});
