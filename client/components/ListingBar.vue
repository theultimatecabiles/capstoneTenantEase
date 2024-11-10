<template>
  <div class="listing-bar-container">
    <div class="sticky top-0 bg-white z-10 p-4 shadow-md">
      <h2 class="text-2xl font-bold text-gray-800">Listings</h2>
    </div>
    <div class="listing-bar-content">
      <ul class="space-y-4">
        <li
  v-for="listing in displayedListings"
  :key="listing.listingId"
  :data-id="listing.listingId"
  :class="[ 
    'bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer', 
    { 'border-2 border-red-500': listing.showDetails } 
  ]"
  @click="selectListing(listing)"
>
          <div class="relative">
            <img
              v-if="listing.images && listing.images.length > 0"
              :src="listing.images[0].imageUrl"
              alt="Listing Image"
              class="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 class="text-xl font-semibold text-red-500 mb-2">{{ listing.title }}</h3>
            <p class="text-gray-700 mb-2">{{ listing.address || 'Address not available' }}</p>
            <p class="text-lg font-medium text-gray-800">
              Price: <span class="text-red-500">₱{{ listing.price.toFixed(2) }}</span> /Month
            </p>
            <div v-if="listing.showDetails" class="mt-4">
              <p><strong>Description:</strong> {{ listing.description || 'N/A' }}</p>
              <p><strong>Place Type:</strong> {{ listing.placeType || 'N/A' }}</p>
              <p><strong>Guest Type:</strong> {{ listing.guestType || 'N/A' }}</p>
              <p><strong>Guests:</strong> {{ listing.guests || 'N/A' }}</p>
              <p><strong>Bedrooms:</strong> {{ listing.bedrooms || 'N/A' }}</p>
              <p><strong>Beds:</strong> {{ listing.beds || 'N/A' }}</p>
              <p><strong>Bathrooms:</strong> {{ listing.bathrooms || 'N/A' }}</p>
              <p><strong>Amenities:</strong></p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div
                  v-for="(amenity, index) in listing.amenities"
                  :key="index"
                  class="flex items-center mb-2"
                >
                  <i :class="amenity.iconClass" :style="{ color: amenity.color }" class="mr-2"></i>
                  {{ amenity.name }}
                </div>
              </div>
            </div>
            <button 
              @click.prevent="viewListing(listing)" 
              class="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              View Listing
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import eventBus from '~/utils/eventBus';

const listings = ref([]);
const displayedListings = ref([]);
const router = useRouter();

// Fetch listings from API and set up data
onMounted(async () => {
  try {
    const response = await fetch('/api/listings');
    if (!response.ok) {
      throw new Error('Error fetching listings');
    }
    const data = await response.json();
    listings.value = data.map((listing) => ({
      ...listing,
      showDetails: false,
    }));
    displayedListings.value = [...listings.value]; // Initialize displayed listings
  } catch (error) {
    console.error('Error fetching listings:', error);
  }
});

// Function to handle selecting a listing
const selectListing = (listing) => {
  eventBus.emit('zoomToMarker', listing.listingId); // Emit event to zoom to marker
  showDetails(listing); // Show details for the selected listing
};

// Function to show the details of a specific listing
const showDetails = (listing) => {
  displayedListings.value.forEach(item => {
    item.showDetails = false; // Close details for all listings
  });
  listing.showDetails = true; // Open details for the selected listing
};

// Function to view a listing in the ListingView component
const viewListing = (listing) => {
  console.log(listing)
  alert("Owner id: " + listing.userId + " listing ID: " + listing.listingId)
  router.push({ name: 'ListingView', query: { listingId: listing.listingId, hostid: listing.userId } });
};

// Function to handle showing details from the map click event
const showListingDetails = (listingId) => {
  const clickedListing = listings.value.find(item => item.listingId === listingId);
  if (clickedListing) {
    showDetails(clickedListing); // Show details for the clicked listing
    scrollToListing(clickedListing.listingId); // Scroll to the specific listing
  }
};

// Function to scroll to the specific listing in the list
const scrollToListing = (listingId) => {
  const listingItems = document.querySelectorAll('.listing-bar-content li');
  
  // Find the item with the correct listingId
  listingItems.forEach(item => {
    if (item.dataset.id === String(listingId)) {
      item.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
};

// Listen for showListingDetails events
onMounted(() => {
  eventBus.on('showListingDetails', showListingDetails);
});
</script>

<style scoped>
.listing-bar-container {
  height: 100vh;
  overflow: hidden;
}

.listing-bar-content {
  height: calc(100vh - 4rem);
  overflow-y: auto;
}

.border-2 {
  border-width: 2px;
}

.border-red-500 {
  border-color: red; 
}
</style>
