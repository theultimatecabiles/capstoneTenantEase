<template>
  <div class="page-wrapper bg-gray-50 min-h-screen">
    <!-- dashHeader component -->
    <dashHeader />

    <!-- Page Label Section -->
    <div class="page-header bg-gradient-to-r from-red-400 to-red-800 text-white py-6 px-8 mb-8">
      <h1 class="text-3xl font-bold">Your Listings</h1>
      <p class="text-lg">Manage your apartment listings and make updates.</p>
    </div>

    <!-- Listing container -->
    <div class="listing-container px-6 py-12 mx-auto max-w-7xl">
      <!-- Listing details -->
      <div v-if="listing && !loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="item in listing"
          :key="item.listingId"
          class="listing-card bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          @click="viewListing(item)"  
        >
          <!-- Listing Image -->
          <img v-if="item.images && item.images.length > 0" :src="item.images[0].imageUrl" alt="Listing Image" class="w-full h-48 object-cover rounded-t-lg" />

          <!-- Listing Content -->
          <div class="p-6 space-y-4">
            <!-- Listing Title -->
            <div class="flex items-center mb-2">
              <i class="fas fa-building text-red-600 mr-2"></i> <!-- Font Awesome icon for title -->
              <h2 class="text-2xl font-semibold text-gray-800">{{ item.title }}</h2>
            </div>

            <!-- Listing Address with Icon -->
            <div class="flex items-center">
              <i class="fas fa-map-marker-alt text-red-600 mr-2"></i> <!-- Font Awesome icon for address -->
              <p class="text-lg text-gray-600">{{ item.address }}</p>
            </div>

            <!-- Action buttons -->
            <div class="flex justify-center space-x-2 mt-4">
              <button 
                @click.prevent="openUpdateModal(item)"
                class="btn bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition duration-200 px-4 py-2 rounded-lg text-sm"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button 
                class="btn bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-200 transition duration-200 px-4 py-2 rounded-lg text-sm"
              >
                <i class="fas fa-trash"></i>
              </button>
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
const showModal = ref(false);
const selectedListing = ref(null);

// Fetch listings and other data when component is mounted
onMounted(async () => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('User not logged in');

    const response = await fetch('/api/getUserListings', {
      headers: {
        'x-user-id': userId,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch user listings');
    listing.value = await response.json();
  } catch (err) {
    console.error('Error fetching data:', err);
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
const openUpdateModal = async (item, event) => {
  try {
    event.stopPropagation();  // Stop the event propagation

    const response = await fetch(`/api/hostlistingview/${item.listingId}`);
    if (!response.ok) throw new Error('Failed to fetch listing details');

    const data = await response.json();
    selectedListing.value = data;
    showModal.value = true;
  } catch (err) {
    console.error('Error fetching listing details:', err);
    error.value = 'Failed to load listing details for update.';
  }
};

// Close the update modal
const closeUpdateModal = () => {
  showModal.value = false;
  selectedListing.value = null;
};
</script>

<style scoped>
.page-wrapper {
  font-family: 'Inter', sans-serif;
}

.page-header {
  color: white;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.page-header p {
  font-size: 1.1rem;
  color: white;
}

.listing-container {
  background-color: #f9fafb;
}

.listing-card {
  position: relative;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.listing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.listing-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

h2 {
  color: #1f2937;
}

p {
  color: #6b7280;
}

.btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  transition: background-color 0.3s, transform 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
}

.bg-green-600 {
  background-color: #10b981;
}

.bg-red-600 {
  background-color: #ef4444;
}

.focus\:ring-4:focus {
  outline: 4px solid rgba(16, 185, 129, 0.5);
}

.focus\:ring-green-200:focus {
  outline: 4px solid rgba(34, 197, 94, 0.5);
}

.focus\:ring-red-200:focus {
  outline: 4px solid rgba(239, 68, 68, 0.5);
}

.text-gray-600 {
  color: #4b5563;
}

.text-gray-800 {
  color: #1f2937;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

@media (max-width: 640px) {
  .listing-card {
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>
