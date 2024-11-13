import { PrismaClient } from '@prisma/client';
import { defineEventHandler } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Fetch listings with necessary relationships and fields, including userId
    const listings = await prisma.listing.findMany({
      select: {
        listingId: true,
        title: true,
        description: true,
        price: true,
        address: true,
        guests: true,
        bedrooms: true,
        beds: true,
        bathrooms: true,
        latitude: true,
        longitude: true,
        createdAt: true,
        updatedAt: true,
        userId: true, // Include userId in the selection
        placeType: {
          select: {
            placeTypeName: true,
          },
        },
        guestType: {
          select: {
            guestTypeName: true,
          },
        },
        images: {
          select: {
            imageUrl: true,
          },
        },
        amenities: {
          select: {
            amenity: {
              select: {
                amenityName: true,
                iconClass: true,
                color: true,
              },
            },
          },
        },
      },
    });

    // Flatten the nested structure of the response
    const flattenedListings = listings.map((listing) => ({
      ...listing,
      placeType: listing.placeType?.placeTypeName || 'Unknown',
      guestType: listing.guestType?.guestTypeName || 'Unknown',
      amenities: listing.amenities.map((item) => ({
        name: item.amenity.amenityName,
        iconClass: item.amenity.iconClass,
        color: item.amenity.color,
      })) || [],
    }));

  

    return flattenedListings;
  } catch (error) {
    console.error('Error fetching listings:', error); // Log error details
    event.res.statusCode = 500;
    event.res.end(JSON.stringify({ error: 'Error fetching listings' }));
  }
});
