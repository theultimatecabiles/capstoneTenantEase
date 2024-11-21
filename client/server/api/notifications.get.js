import { PrismaClient } from '@prisma/client';
import { defineEventHandler, getQuery } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { userId } = getQuery(event);

    if (!userId) {
      throw new Error('User ID is required');
    }

    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          {
            bookerId: parseInt(userId, 10),
            type: 'bookingApproved', // Notification for booker
          },
          {
            hostId: parseInt(userId, 10),
            type: 'newBookingRequest', // Notification for host
          }
        ]
      },
      orderBy: {
        dateCreated: 'desc',
      },
      select: {
        notificationId: true,
        content: true,
        dateCreated: true,
        type: true,
      },
    });

    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    event.res.statusCode = 500;
    return { error: 'Error fetching notifications' };
  }
});