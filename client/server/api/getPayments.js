import { defineEventHandler, getQuery } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { userId, type } = getQuery(event);

  if (!userId || !type) {
    return { success: false, message: 'User ID and type are required.' };
  }

  try {
    let payments;

    if (type === 'host') {
      // Fetch payments for the host
      payments = await prisma.payment.findMany({
        where: {
          booking: {
            listing: {
              userId: parseInt(userId, 10),
            },
          },
        },
        include: {
          status: true,
          booking: {
            include: {
              booker: true,
              listing: true,
            },
          },
        },
      });
    } else if (type === 'user') {
      // Fetch payments for the user
      payments = await prisma.payment.findMany({
        where: {
          booking: {
            bookerId: parseInt(userId, 10),
          },
        },
        include: {
          status: true,
          booking: {
            include: {
              listing: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });
    } else {
      return { success: false, message: 'Invalid type specified.' };
    }

    return { success: true, payments };
  } catch (error) {
    console.error('Error fetching payments:', error);
    return { success: false, message: 'An error occurred while fetching payments.' };
  } finally {
    await prisma.$disconnect();
  }
});