import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Read the request body to get the updated listing data
    const body = await readBody(event);
    const { listingId, title, address, price, guests, bedrooms, beds, bathrooms, amenities, images } = body;

    // Update the listing in the database
    const updatedListing = await prisma.listing.update({
      where: { id: listingId },
      data: {
        title,
        address,
        price,
        guests,
        bedrooms,
        beds,
        bathrooms,
        amenities: {
          set: amenities.map((amenity) => ({ name: amenity }))
        },
        images: {
          set: images.map((imageUrl) => ({ imageUrl }))
        }
      }
    });

    return updatedListing;
  } catch (error) {
    console.error('Error updating listing:', error);
    event.res.statusCode = 500;
    return { error: 'Error updating listing' };
  }
});