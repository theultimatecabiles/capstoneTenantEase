import { PrismaClient } from '@prisma/client';
import uploadMiddleware from './multerMiddleware'; // Adjust path if necessary

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  await new Promise((resolve, reject) => {
    uploadMiddleware.array('images')(event.req, event.res, (err) => {
      if (err) {
        console.error('Multer error:', err);
        event.res.statusCode = 500;
        event.res.end(JSON.stringify({ error: 'File upload error' }));
        return reject(err);
      }
      resolve();
    });
  });

  try {
    const body = event.req.body;
    const files = event.req.files || [];

    if (!Array.isArray(files)) {
      event.res.statusCode = 500;
      event.res.end(JSON.stringify({ error: 'Invalid file data' }));
      return;
    }

    // Map file paths for the database
    const imageUrls = files.map(file => ({
      imageUrl: `/images/listingpictures/${file.filename}` // Path to save in the database
    }));

    // Parse amenities
    const amenitiesIds = body.amenities ? body.amenities.split(',').map(id => parseInt(id, 10)) : [];

    // Create a new listing
    const listing = {
      title: body.title,
      description: body.description,
      address: body.address,
      price: parseFloat(body.price),
      placeTypeId: parseInt(body.placeTypeId, 10),
      guestTypeId: parseInt(body.guestTypeId, 10),
      guests: parseInt(body.guests, 10),
      bedrooms: parseInt(body.bedrooms, 10),
      beds: parseInt(body.beds, 10),
      bathrooms: parseInt(body.bathrooms, 10),
      latitude: parseFloat(body.latitude),
      longitude: parseFloat(body.longitude),
      userId: parseInt(body.userId, 10),
    };

    // Insert the listing into the database
    const newListing = await prisma.listing.create({ data: listing });

    // Save images
    await prisma.image.createMany({
      data: imageUrls.map(url => ({
        listingId: newListing.listingId,
        imageUrl: url.imageUrl
      })),
    });

    // Save amenities
    await prisma.listingAmenity.createMany({
      data: amenitiesIds.map(amenityId => ({
        listingId: newListing.listingId,
        amenityId
      })),
    });

    // Respond with success message
    event.res.statusCode = 200;
    event.res.end(JSON.stringify({ message: 'Listing added successfully' }));
  } catch (error) {
    console.error('Error adding listing:', error);
    event.res.statusCode = 500;
    event.res.end(JSON.stringify({ error: 'Error adding listing' }));
  }
});
