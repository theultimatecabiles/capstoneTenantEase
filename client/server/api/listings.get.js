import { PrismaClient } from '@prisma/client';
import { defineEventHandler } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Fetch listings with necessary relationships and fields
    const listings = await prisma.listing.findMany({
      select: {
        listingId: true, // Ensure this field matches your Vue components
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
        placeType: {
          select: {
            placeTypeName: true, // Ensure this field is used correctly
          },
        },
        guestType: {
          select: {
            guestTypeName: true, // Ensure this field is used correctly
          },
        },
        images: {
          select: {
            imageUrl: true, // Ensure this field is used correctly
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
      })) || [], // Ensure amenities are an empty array if not available
    }));

    console.log('Listings fetched:', flattenedListings); // Debugging

    return flattenedListings;
  } catch (error) {
    console.error('Error fetching listings:', error); // Log error details
    event.res.statusCode = 500;
    event.res.end(JSON.stringify({ error: 'Error fetching listings' }));
  }
});
