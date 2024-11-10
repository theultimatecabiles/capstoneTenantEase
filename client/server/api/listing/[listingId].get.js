import { PrismaClient } from '@prisma/client';
import { defineEventHandler, getRouterParam } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Extract listingId from URL params
    const listingId = getRouterParam(event, 'listingId');
    
    if (!listingId) {
      return { statusCode: 400, body: { error: 'Listing ID is required' } };
    }

    // Fetch the listing by its ID, including user details
    const listing = await prisma.listing.findUnique({
      where: { listingId: parseInt(listingId, 10) },
      include: {
        user: {
          select: {
            userId: true,
            name: true,
            email: true,
            profilePic: true,
          },
        },
        placeType: true,
        guestType: true,
        images: true,
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    });

    // If no listing is found, return 404
    if (!listing) {
      return { statusCode: 404, body: { error: 'Listing not found' } };
    }

    // Flatten the structure to simplify the response
    const flattenedListing = {
      ...listing,
      placeType: listing.placeType?.placeTypeName || 'Unknown',
      guestType: listing.guestType?.guestTypeName || 'Unknown',
      images: listing.images.map((image) => ({ imageUrl: image.imageUrl })),
      amenities: listing.amenities.map((item) => ({
        name: item.amenity.amenityName,
        iconClass: item.amenity.iconClass,
        color: item.amenity.color,
      })),
      user: listing.user ? {
        userId: listing.user.userId,
        name: listing.user.name,
        email: listing.user.email,
        profilePic: listing.user.profilePic,
      } : null,
    };

    return { statusCode: 200, body: flattenedListing };
  } catch (error) {
    console.error('Error fetching listing:', error);
    return { statusCode: 500, body: { error: 'Error fetching listing' } };
  }
});