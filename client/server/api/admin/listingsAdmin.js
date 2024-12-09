import { PrismaClient } from '@prisma/client';
import { defineEventHandler, createError } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const listings = await prisma.listing.findMany({
      include: {
        images: true,
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            profilePic: true,
            document: true,
          },
        },
        approvalStatus: {
          select: {
            statusName: true,
          },
        },
        placeType: true,
        guestType: true,
      },
    });

    // Map the listings to include a status field
    const mappedListings = listings.map(listing => ({
      ...listing,
      status: listing.approvalStatus?.statusName?.toUpperCase() || 'UNKNOWN',
    }));


    return mappedListings;
  } catch (error) {
    console.error('Error fetching listings:', error);
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  }
});