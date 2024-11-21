import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { bookingId } = await readBody(event);

    // Update the booking status to "approved"
    const updatedBooking = await prisma.booking.update({
      where: { bookingId: bookingId }, // Use bookingId as the primary key
      data: { statusId: 2 }, // Assuming 2 is the ID for "approved" status
    });

    // Notify the booker about the approval
    await prisma.notification.create({
      data: {
        hostId: updatedBooking.hostId, // Provide the hostId
        bookerId: updatedBooking.bookerId, // Use bookerId from the updated booking
        listingId: updatedBooking.listingId, // Provide the listingId
        content: 'Your booking has been approved. Please proceed with the payment.',
        type: 'bookingApproved',
      },
    });

    return { success: true, message: 'Booking approved and booker notified.' };
  } catch (error) {
    console.error('Error approving booking:', error);
    return { success: false, message: 'Failed to approve booking.' };
  }
});