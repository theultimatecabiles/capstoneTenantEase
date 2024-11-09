<template>
  <div class="page-wrapper">
    <!-- dashHeader component -->
    <dashHeader />

    <!-- Listing container -->
    <div class="listing-container">
      <!-- Listing details -->
      <div v-if="listing && !loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        <div
          v-for="item in listing"
          :key="item.listingId"
          class="listing-card bg-white shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
          @click="viewListing(item)"  
        >
          <!-- Listing Image -->
          <img v-if="item.images.length > 0" :src="item.images[0].imageUrl" alt="Listing Image" class="listing-image" />

          <!-- Listing Content -->
          <div class="p-6 space-y-4">
            <!-- Listing Title -->
            <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ item.title }}</h2> <!-- Improved typography -->

            <!-- Listing Address -->
            <p class="text-lg text-gray-500">{{ item.address }}</p>

            <!-- Action buttons -->
            <div class="flex justify-between mt-4">
              <button 
                @click.prevent="openUpdateModal(item)"
                class="btn bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition duration-200"
              >
                Modify
              </button>
              <button class="btn bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-200 transition duration-200">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <UpdateListingModal 
    v-if="showModal" 
    :listing="selectedListing" 
    @close="closeUpdateModal"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import dashHeader from '@/components/dashHeader.vue';
import UpdateListingModal from '@/components/UpdateListingModal.vue';

const router = useRouter();
const listing = ref([]);
const loading = ref(true);
const error = ref(null);
const showModal = ref(false);  // Track the modal visibility
const selectedListing = ref(null);  // Store the selected listing data

// Fetch listings when component is mounted
onMounted(async () => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await fetch('/api/getUserListings', {
      headers: {
        'x-user-id': userId,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch user listings');
    listing.value = await response.json();
  } catch (err) {
    console.error('Error fetching user listings:', err);
    error.value = 'Failed to load your listing details.';
  } finally {
    loading.value = false;
  }
});

// Function to handle viewing a listing
const viewListing = (item) => {
  router.push({ name: 'hostListingView', query: { listingId: item.listingId } });
};

// Open the update modal with the selected listing
const openUpdateModal = (item) => {
  event.stopPropagation();
  selectedListing.value = item;
  showModal.value = true;
};

// Close the update modal
const closeUpdateModal = () => {
  showModal.value = false;
  selectedListing.value = null;
};
</script>

<style scoped>
/* Full-page wrapper */
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #f8fafc;
}

/* Listing container, max width ensures it is centered */
.listing-container {
  padding: 40px;
  flex-grow: 1;
  max-width: 1400px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Ensuring dashHeader takes full width and is at the top */
.dashHeader {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

/* Styling for each listing card */
.listing-card {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.listing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* Image styles */
img {
  height: 240px; /* Adjusted image height */
  width: 100%;
  object-fit: cover;
  border-bottom: 2px solid #eaeaea;
  transition: opacity 0.3s ease;
}

img:hover {
  opacity: 0.9;
}

/* Button styles */
.btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
}

p {
  font-size: 1.125rem;
  line-height: 1.6;
  color: #555;
}

.flex {
  display: flex;
}

.space-x-4 {
  gap: 1rem;
}

/* Card Content */
.space-y-4 {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
header {
  z-index: 50;
}
</style>
