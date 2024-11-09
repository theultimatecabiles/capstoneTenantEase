import { PrismaClient } from '@prisma/client';
import { defineEventHandler } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Extract userId from URL params
    //const userId = event.context.params.userId;
    const userId = ref(localStorage.getItem('userId'));

    // Fetch listings by userId
    const listings = await prisma.listing.findMany({
      where: { userId: parseInt(userId) }, // Ensure userId is a number
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
        placeType: {
          select: { placeTypeName: true },
        },
        guestType: {
          select: { guestTypeName: true },
        },
        images: {
          select: { imageUrl: true },
        },
        amenities: {
          select: {
            amenity: {
              select: { amenityName: true, iconClass: true, color: true },
            },
          },
        },
      },
    });

    // If no listings are found, return an empty array
    if (!listings || listings.length === 0) {
      return { listings: [] }; // Return an empty array if no listings are found
    }

    // Flatten the structure for each listing
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

    return flattenedListings; // Return the flattened listings
  } catch (error) {
    console.error('Error fetching userlistings:', error);
    event.res.statusCode = 500;
    return { error: 'Error fetching userlistings' };
  }
});
