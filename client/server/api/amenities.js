import { PrismaClient } from '@prisma/client';
import { defineEventHandler } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const amenities = await prisma.amenity.findMany();
    return amenities;
  } catch (error) {
    console.error('Error fetching amenities:', error);
    event.res.statusCode = 500;
    return { error: 'Error fetching amenities' };
  }
});
