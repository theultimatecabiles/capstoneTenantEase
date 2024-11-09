<template>
  <header class="bg-white  border-b border-gray-200 p-2">
    <nav class="container mx-auto flex justify-between items-center">
      <NuxtLink to="/">
        <div class="text-4xl font-extrabold text-red-500 flex-shrink-0">
          TenantEase
        </div>
      </NuxtLink>
      <div class="flex items-center space-x-4 max-w-3xl w-full">
        <div class="relative flex-grow">
          <input
            type="text"
            placeholder="Search for properties"
            v-model="selectedTitle"
            class="p-3 border border-gray-300 rounded-full w-full pl-12 pr-16 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            @focus="fetchListings"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          <!-- Dropdown for listing suggestions -->
          <ul
            v-if="listings.length > 0"
            class="absolute left-0 top-full w-full bg-white border border-gray-300 rounded-md mt-1 z-10 max-h-60 overflow-y-auto"
          >
            <li
              v-for="listing in listings"
              :key="listing.listingId"
              class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              @click="selectListing(listing)"
            >
              <img
                v-if="listing.images.length > 0"
                :src="listing.images[0].imageUrl"
                alt="Listing Image"
                class="w-10 h-10 rounded-md mr-2"
              />
              <div>
                <div class="font-semibold">{{ listing.title }}</div>
                <div class="text-gray-500">{{ listing.price }} per month</div>
              </div>
            </li>
          </ul>
        </div>
        <button
          class="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
        >
          Search
        </button>
        <button
          @click="toggleModal"
          class="p-3 text-red-500 hover:text-red-600 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Modal Component -->
    <Modal v-if="isModalOpen" @close="toggleModal" />
  </header>
</template>

<script>
import Modal from '@/components/Modal.vue'; // Update the path as needed

export default {
  components: {
    Modal,
  },
  data() {
    return {
      isModalOpen: false,
      listings: [], // Store all fetched listings
    };
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    async fetchListings() {
      try {
        const response = await fetch('/api/listings');
        if (!response.ok) throw new Error('Failed to fetch listings');

        const data = await response.json();
        this.listings = data; // Store the fetched data in listings
      } catch (error) {
        console.error('Error fetching listings:', error);
        this.listings = [];
      }
    },
    selectListing(listing) {
      this.selectedTitle = listing.title; // Set input value to listing title
      // Handle when a listing is selected from the dropdown
      // Here you could also navigate to a listing detail page or perform another action
      this.listings = []; // Clear the dropdown after selection
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  z-index: 9999; /* Set a high z-index to ensure the modal is on top */
}

/* Scoped styles for the Header component */
</style>
