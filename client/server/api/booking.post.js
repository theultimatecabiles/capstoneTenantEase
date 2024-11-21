import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody, createError } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  try {
    // Fetch the listing to get the hostId
    const listing = await prisma.listing.findUnique({
      where: {
        listingId: parseInt(body.listingId, 10),
      },
      select: {
        userId: true, // The userId field refers to the host (the one who added the listing)
      },
    });

    if (!listing) {
      throw createError({ statusCode: 404, message: 'Listing not found' });
    }

    // Create the new booking
    const newBooking = await prisma.booking.create({
      data: {
        hostId: listing.userId, // The user who added the listing is the host
        bookerId: parseInt(body.userId, 10), // The user who made the booking is the booker
        listingId: parseInt(body.listingId, 10),
        bookingDate: new Date(body.bookingDate),
        statusId: parseInt(body.statusId, 10),
      },
    });

    // Optionally, create a booking history entry
    await prisma.bookingHistory.create({
      data: {
        bookingId: newBooking.bookingId,
        statusId: newBooking.statusId,
      }
    });

    return { success: true, booking: newBooking };
  } catch (error) {
    console.error('Error creating booking:', error);
    throw createError({ statusCode: 500, message: 'Error creating booking' });
  }
});