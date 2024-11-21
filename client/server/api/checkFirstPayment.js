import { defineEventHandler, getQuery } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { bookingId } = getQuery(event);

    if (!bookingId) {
      return { success: false, message: 'Booking ID is required.' };
    }

    const paymentExists = await prisma.payment.findFirst({
      where: { bookingId: parseInt(bookingId) },
    });

    return { success: true, isFirstPayment: !paymentExists };
  } catch (error) {
    console.error('Error checking first payment:', error);
    return { success: false, message: 'Failed to check payment status.' };
  }
});