import { defineEventHandler, readBody } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Default values for paymentMethodId and statusId
const DEFAULT_PAYMENT_METHOD_ID = 1;
const DEFAULT_STATUS_ID = 1;

export default defineEventHandler(async (event) => {
  try {
    const { bookingId, amount, nextPaymentDue } = await readBody(event);

    // Use default values if not provided
    const paymentMethodId = DEFAULT_PAYMENT_METHOD_ID;
    const statusId = DEFAULT_STATUS_ID;

    // Validate paymentMethodId
    const paymentMethod = await prisma.paymentMethod.findUnique({
      where: { methodId: paymentMethodId },
    });
    if (!paymentMethod) {
      return { success: false, message: 'Invalid payment method.' };
    }

    // Validate statusId
    const paymentStatus = await prisma.paymentStatus.findUnique({
      where: { statusId },
    });
    if (!paymentStatus) {
      return { success: false, message: 'Invalid payment status.' };
    }

    // Create a payment record in the database
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        amount,
        paymentDate: new Date(),
        paymentMethodId,
        statusId,
        nextPaymentDue: new Date(nextPaymentDue), // Ensure the date is correctly formatted
      },
    });

    return { success: true, message: 'Payment processed successfully.', payment };
  } catch (error) {
    console.error('Error processing payment:', error);
    return { success: false, message: 'Failed to process payment.' };
  }
});