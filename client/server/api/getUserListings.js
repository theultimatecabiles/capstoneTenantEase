import { PrismaClient } from '@prisma/client';
import { defineEventHandler, createError } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const userId = event.req.headers['x-user-id'];

  if (!userId) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  try {
    const listings = await prisma.listing.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        images: true,
        approvalStatus: {
          select: {
            statusName: true,
          },
        },
      },
    });

    // Map the listings to include status
    const mappedListings = listings.map(listing => ({
      ...listing,
      status: listing.approvalStatus?.statusName || 'UNKNOWN',
    }));

    return mappedListings;
  } catch (error) {
    console.error('Error fetching user listings:', error);
    throw createError({
      statusCode: 500,
      message: 'Error fetching user listings',
    });
  }
});