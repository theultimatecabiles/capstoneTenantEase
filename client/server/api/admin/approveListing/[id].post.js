import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const listingId = parseInt(event.context.params.id)

  try {
    const updatedListing = await prisma.listing.update({
      where: { listingId: listingId },
      data: { approvalStatusId: 2 } // 2 is the statusId for 'approved'
    })

    // Create a notification for the host
    await prisma.notification.create({
      data: {
        hostId: updatedListing.userId,
        bookerId: updatedListing.userId, // In this case, it's the same as hostId
        listingId: updatedListing.listingId,
        content: `Your listing "${updatedListing.title}" has been approved.`,
        type: 'LISTING_APPROVED'
      }
    })

    return { message: 'Listing approved successfully', listing: updatedListing }
  } catch (error) {
    console.error('Error approving listing:', error)
    return { statusCode: 500, body: JSON.stringify({ error: 'An error occurred while approving the listing' }) }
  }
})