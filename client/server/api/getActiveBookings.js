import { PrismaClient } from '@prisma/client';
import { defineEventHandler, getQuery, getHeaders } from 'h3';

// Initialize Prisma client
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Get userId from the request's headers or query params
  const userId = getHeaders(event)['user-id'] || getQuery(event).userId;

  // Ensure userId is provided
  if (!userId) {
    return { statusCode: 400, message: 'User ID is required.' };
  }

  try {
    // Fetch the bookings where the user is the host and status is active
    const bookings = await prisma.booking.findMany({
      where: {
        hostId: parseInt(userId, 10), // Filter by the host ID
        statusId: 2, // Filter by active status
      },
      include: {
        listing: {
          include: {
            images: true, // Include images related to the listing
          },
        },
        booker: true,    // Include the user who made the booking (booker)
        status: true,    // Include booking status
      },
    });

    // Return bookings data
    return { bookings };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return { statusCode: 500, message: 'Internal server error' };
  }
});