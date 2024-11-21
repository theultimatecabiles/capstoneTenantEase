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
    });

    if (!latestPayment) {
      return { success: false, message: 'No payment details found for the given booking ID.' };
    }

    const { nextPaymentDue } = latestPayment;

    return { success: true, nextPaymentDue };
  } catch (error) {
    console.error('Error fetching latest payment due date:', error);
    return { success: false, message: 'Failed to fetch latest payment due date.' };
  }
});