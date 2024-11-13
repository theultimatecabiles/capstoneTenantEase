import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const REGISTER_SECRET_KEY = process.env.REGISTER_SECRET_KEY;

export default defineEventHandler(async (event) => {
  const { token } = getQuery(event); // Extract token from query parameters

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, REGISTER_SECRET_KEY);

    // Find the user by the decoded userId
    const user = await prisma.user.findUnique({ where: { userId: decoded.userId } });

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the user is already verified
    if (user.verified) {
      return { message: 'Your account is already verified. you will be auto directed to the home page. PLEASE WAIT.' };
    }

    // Update the user as verified
    await prisma.user.update({
      where: { userId: decoded.userId },
      data: { verified: true, verificationToken: null },
    });

    return { message: 'Email verified successfully. you will be auto directed to the home page. PLEASE WAIT.' };
  } catch (error) {
    return { message: 'Verification failed. The token may be invalid or expired.' };
  }
});
