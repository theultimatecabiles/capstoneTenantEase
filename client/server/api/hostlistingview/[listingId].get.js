import { PrismaClient } from '@prisma/client';
import { defineEventHandler } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Extract listingId from URL params
    const listingId = event.context.params.listingId;
    
    // Fetch the listing by its ID
    const listing = await prisma.listing.findUnique({
      where: { listingId: parseInt(listingId) }, // Ensure listingId is a number
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

    // If no listing is found, return 404
    if (!listing) {
      event.res.statusCode = 404;
      return { error: 'Listing not found' };
    }

    // Flatten the structure to simplify the response
    const flattenedListing = {
      ...listing,
      placeType: listing.placeType?.placeTypeName || 'Unknown',
      guestType: listing.guestType?.guestTypeName || 'Unknown',
      images: listing.images.map(image => ({ imageUrl: image.imageUrl })) || [],
      amenities: listing.amenities.map((item) => ({
        name: item.amenity.amenityName,
        iconClass: item.amenity.iconClass,
        color: item.amenity.color,
      })) || [],
    };

    return flattenedListing;
  } catch (error) {
    console.error('Error fetching listing:', error);
    event.res.statusCode = 500;
    return { error: 'Error fetching listing' };
  }
});