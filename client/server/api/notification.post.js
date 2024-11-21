import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody, createError } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Extract required fields from the request body
    const { hostId, bookerId, listingId, content, type } = await readBody(event);

    // Check if all required fields are provided
    if (!hostId || !bookerId || !listingId || !content) {
      throw createError({
        statusCode: 400,
        message: 'Host ID, Booker ID, Listing ID, and content are required'
      });
    }

    // Create a new notification
    const newNotification = await prisma.notification.create({
      data: {
        hostId: parseInt(hostId, 10),
        bookerId: parseInt(bookerId, 10),
        listingId: parseInt(listingId, 10),
        content,
        type,
        // dateCreated is handled automatically by Prisma's @default(now())
      },
    });

    // Return the created notification
    return newNotification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw createError({
      statusCode: 500,
      message: 'Error creating notification'
    });
  }
});