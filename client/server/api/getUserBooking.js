import { defineEventHandler, getQuery } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const userId = getQuery(event).userId;

  if (!userId) {
    return { statusCode: 400, message: 'User ID is required.' };
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        bookerId: parseInt(userId), 
      },
      include: {
        listing: {
          include: {
            images: true, // Include images if needed
          },
        },
        status: true, // Include booking status
      },
    });

    return { bookings };
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return { statusCode: 500, message: 'Internal server error' };
  }
});