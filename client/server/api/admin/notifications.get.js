import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Fetch notifications for admin
    const notifications = await prisma.adminNotification.findMany({
      select: {
        notificationId: true,
        type: true,
        content: true,
        dateCreated: true,
        adminId: true,
      },
      orderBy: {
        dateCreated: 'desc',
      },
    });
    
    // Transform the data to match the desired format
    const formattedNotifications = notifications.map(notification => ({
      id: notification.notificationId,
      type: notification.type,
      message: notification.content,
      createdAt: notification.dateCreated,
      adminId: notification.adminId,
    }));

    return formattedNotifications;
  } catch (error) {
    console.error('Error fetching admin notifications:', error);
    event.res.statusCode = 500;
    return { error: 'Error fetching admin notifications' };
  }
});