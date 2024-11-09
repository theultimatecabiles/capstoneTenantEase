<template>
    <div>
      <!-- Include the DashHeader component -->
      <dashHeader />
  
      <!-- Profile Content -->
      <div class="container mx-auto p-4">
        <div class="bg-white border border-gray-300 rounded-lg shadow-lg p-8 space-y-6">
          <h2 class="text-3xl font-bold text-center text-red-600">User Profile</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <p>{{ user.name }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <p>{{ user.email }}</p>
            </div>
            <!-- Additional user details can be added here -->
          </div>
          <div class="text-center">
            <button
              @click="editProfile"
              class="p-3 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  // Import DashHeader component
  import dashHeader from '~/components/dashHeader.vue';
  
  const user = ref({
    name: 'John Doe',
    email: 'johndoe@example.com',
    // Add more user attributes as needed
  });
  
  const editProfile = () => {
    alert('Edit profile feature is under development.');
  };
  </script>
  
  <style scoped>
  /* Add scoped styles for the Profile page */
  </style>