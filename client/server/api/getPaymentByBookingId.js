import { defineEventHandler, getQuery } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { bookingId } = getQuery(event);

    if (!bookingId) {
      return { success: false, message: 'Booking ID is required.' };
    }

    const latestPayment = await prisma.payment.findFirst({
      where: { bookingId: parseInt(bookingId) },
      orderBy: { paymentId: 'desc' },
      include: {
        paymentMethod: true,
        status: true,
      },
    });

    if (!latestPayment) {
      return { success: false, message: 'No payment details found for the given booking ID.' };
    }

    // Access the amount directly from the latestPayment object
    const { amount, nextPaymentDue } = latestPayment;

    return { success: true, latestPayment: { ...latestPayment, amount, nextPaymentDue } };
  } catch (error) {
    console.error('Error fetching payment details:', error);
    return { success: false, message: 'Failed to fetch payment details.' };
  }
});