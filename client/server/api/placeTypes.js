import { PrismaClient } from '@prisma/client';
import { defineEventHandler } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const placeTypes = await prisma.placeType.findMany();
    return placeTypes;
  } catch (error) {
    console.error('Error fetching place types:', error);
    event.res.statusCode = 500;
    return { error: 'Error fetching place types' };
  }
});
