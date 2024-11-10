import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody, createError } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  try {
    const newBooking = await prisma.booking.create({
      data: {
        userId: parseInt(body.userId, 10),
        listingId: parseInt(body.listingId, 10),
        bookingDate: new Date(body.bookingDate),
        statusId: parseInt(body.statusId, 10),
        // Note: createdAt is now handled automatically by Prisma's @default(now())
      },
    });

    // Optionally, you can create a booking history entry here
    await prisma.bookingHistory.create({
      data: {
        bookingId: newBooking.bookingId,
        statusId: newBooking.statusId,
        // You might want to add more fields here if necessary
      }
    });

    return { success: true, booking: newBooking };
  } catch (error) {
    console.error('Error creating booking:', error);
    throw createError({ statusCode: 500, message: 'Error creating booking' });
  }
});