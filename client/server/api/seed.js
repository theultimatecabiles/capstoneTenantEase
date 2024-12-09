import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insert booking statuses
  await prisma.bookingStatus.createMany({
    data: [
      { statusId: 1, statusName: 'Pending' },
      { statusId: 2, statusName: 'Booked' },
    ],
    skipDuplicates: true,
  });

  // Insert place types
  await prisma.placeType.createMany({
    data: [
      { placeTypeId: 1, placeTypeName: 'House' },
      { placeTypeId: 2, placeTypeName: 'Apartment' },
      { placeTypeId: 3, placeTypeName: 'Boarding House' },
      { placeTypeId: 4, placeTypeName: 'Studio Type' },
      { placeTypeId: 5, placeTypeName: 'Room with Owner' },
    ],
    skipDuplicates: true,
  });

  // Insert guest types
  await prisma.guestType.createMany({
    data: [
      { guestTypeId: 1, guestTypeName: 'The entire place' },
      { guestTypeId: 2, guestTypeName: 'Only a room' },
      { guestTypeId: 3, guestTypeName: 'Shared room' },
    ],
    skipDuplicates: true,
  });

  // Insert amenities
  await prisma.amenity.createMany({
    data: [
      { amenityId: 1, amenityName: 'Wi-Fi', color: '#4CAF50', iconClass: 'fas fa-wifi' },
      { amenityId: 2, amenityName: 'TV', color: '#FFC107', iconClass: 'fas fa-tv' },
      { amenityId: 3, amenityName: 'Kitchen', color: '#FF5722', iconClass: 'fas fa-utensils' },
      { amenityId: 4, amenityName: 'Washer', color: '#607D8B', iconClass: 'fas fa-tachometer-alt' },
      { amenityId: 5, amenityName: 'Parking Lot', color: '#2196F3', iconClass: 'fas fa-parking' },
      { amenityId: 6, amenityName: 'Paid Parking', color: '#9C27B0', iconClass: 'fas fa-money-bill-wave' },
      { amenityId: 7, amenityName: 'Air Conditioning', color: '#00BCD4', iconClass: 'fas fa-snowflake' },
      { amenityId: 8, amenityName: 'Own Workspace', color: '#FF9800', iconClass: 'fas fa-laptop' },
    ],
    skipDuplicates: true,
  });

  // Insert roles
  await prisma.role.createMany({
    data: [
      { roleId: 1, roleName: 'Renter' },
      { roleId: 2, roleName: 'Host' },
      { roleId: 3, roleName: 'Admin' },
    ],
    skipDuplicates: true,
  });

  // Insert approval statuses
  await prisma.approvalStatus.createMany({
    data: [
      { statusId: 1, statusName: 'pending' },
      { statusId: 2, statusName: 'approved' },
      { statusId: 3, statusName: 'rejected' },
    ],
    skipDuplicates: true,
  });

  // Insert payment methods
  await prisma.paymentMethod.createMany({
    data: [
      { methodId: 1, methodName: 'PayPal' },
      { methodId: 2, methodName: 'Cash on Hand' },
    ],
    skipDuplicates: true,
  });

  // Insert payment statuses
  await prisma.paymentStatus.createMany({
    data: [{ statusId: 1, statusName: 'Paid' }],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });