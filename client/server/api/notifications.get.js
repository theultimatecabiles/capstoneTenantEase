// Server-side code to fetch notifications with listing info
import { PrismaClient } from '@prisma/client';
import { defineEventHandler, getQuery } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { userId } = getQuery(event);

    const notifications = await prisma.notification.findMany({
      where: {
        hostId: parseInt(userId, 10), // Ensure userId is an integer
      },
      orderBy: {
        dateCreated: 'desc',
      },
      select: {
        notificationId: true,
        content: true,
        dateCreated: true,
        bookerId: true,
        listingId: true,
        // Fetch listing details
        listing: {
          select: {
            title: true,
            address: true,
            description: true,
          }
        },
      },
    });

    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    event.res.statusCode = 500;
    return { error: 'Error fetching notifications' };
  }
});
