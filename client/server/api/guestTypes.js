import { PrismaClient } from '@prisma/client';
import { defineEventHandler } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const guestTypes = await prisma.guestType.findMany();
    return guestTypes;
  } catch (error) {
    console.error('Error fetching guest types:', error);
    event.res.statusCode = 500;
    return { error: 'Error fetching guest types' };
  }
});
