<template>
  <div>
    <!-- Add the Dash Header as the Header -->
    <dashHeader />

    <div class="container mx-auto px-4 py-8">
      <!-- Dashboard Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Listings Overview -->
        <div class="bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-xl font-semibold text-gray-700">Your Listings</h2>
          <p class="text-gray-500 mt-2">Manage and edit your property listings here.</p>
          <router-link
            to="/listings"
            class="mt-4 inline-block px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            View Listings
          </router-link>
        </div>

        <!-- Bookings Overview -->
        <div class="bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-xl font-semibold text-gray-700">Bookings</h2>
          <p class="text-gray-500 mt-2">Track your upcoming and past bookings.</p>
          <router-link
            to="/bookings"
            class="mt-4 inline-block px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            View Bookings
          </router-link>
        </div>

        <!-- Reviews Overview -->
        <div class="bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-xl font-semibold text-gray-700">Reviews</h2>
          <p class="text-gray-500 mt-2">Manage reviews and feedback from your guests.</p>
          <router-link
            to="/reviews"
            class="mt-4 inline-block px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            View Reviews
          </router-link>
        </div>
      </div>

      <!-- Analytics Section -->
      <div class="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-700">Analytics</h2>
        <p class="text-gray-500 mt-2">Get insights into your property's performance.</p>
        <!-- You can add charts or other analytics-related components here -->
      </div>
    </div>
  </div>
</template>

<script>
// Importing the Header (DashHeader) component
import dashHeader from '@/components/dashHeader.vue';

export default {
  name: 'Dashboard',
  components: {
    dashHeader
  }
};
</script>

<style scoped>
/* Optional custom styling for the dashboard */
.container {
  max-width: 1200px;
}

h2 {
  font-size: 1.25rem;
}

p {
  font-size: 0.875rem;
}
</style>
