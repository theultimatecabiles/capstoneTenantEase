import { PrismaClient } from '@prisma/client';
import { defineEventHandler, getQuery } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Get userId from query parameters
    const { userId } = getQuery(event);

    // Fetch notifications for the specified userId
    const notifications = await prisma.notification.findMany({
      where: {
        hostId: parseInt(userId, 10), // Ensure userId is an integer
      },
      orderBy: {
        dateCreated: 'desc', // Optional: Sort notifications by the creation date
      },
      select: {
        notificationId: true,
        content: true,
        dateCreated: true,
        bookerId: true,
        listingId: true,
      },
    });

    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    event.res.statusCode = 500;
    return { error: 'Error fetching notifications' };
  }
});