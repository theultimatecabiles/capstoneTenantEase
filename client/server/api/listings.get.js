import { PrismaClient } from '@prisma/client';
import { defineEventHandler } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Fetch only approved listings that do not have any active bookings
    const listings = await prisma.listing.findMany({
      where: {
        approvalStatusId: 2, // 2 represents 'approved'
        bookings: {
          none: {
            // Exclude listings with active bookings
            status: {
              statusName: {
                in: ['Booked', 'Upcoming'], // Replace with the actual statuses for active bookings
              },
            },
          },
        },
      },
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
        approvalStatusId: true,
        userId: true,
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
        approvalStatus: {
          select: {
            statusName: true,
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
      isApproved: listing.approvalStatus?.statusName === 'Approved',
    }));

    return flattenedListings;
  } catch (error) {
    console.error('Error fetching listings:', error);
    event.res.statusCode = 500;
    event.res.end(JSON.stringify({ error: 'Error fetching listings' }));
  }
});
