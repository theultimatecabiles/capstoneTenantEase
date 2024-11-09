<template>
    <div>
      <!-- Conditionally Render Header or dashHeader based on authentication status -->
      <Header v-if="!isLoggedIn" />
      <DashHeader v-else />
  
      <!-- Container for the listing -->
      <div class="listing-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Loading message -->
        <div v-if="loading" class="loading text-center py-4 text-xl">
          Loading listing details...
        </div>
  
        <!-- Listing details -->
        <div v-if="listing && !loading" class="listing-details">
          <!-- Title Section -->
          <div class="listing-header mb-4">
            <h1 class="text-3xl font-bold text-blue-500 mb-2">{{ listing.title }}</h1>
            <p class="text-gray-600">{{ listing.address }}</p>
          </div>
  
          <!-- Image Carousel Section -->
          <div class="carousel-wrapper relative">
            <Carousel ref="carouselRef" v-if="listing.images && listing.images.length" v-model="currentIndex">
              <Slide v-for="(image, index) in listing.images" :key="index">
                <div class="w-full h-40 overflow-hidden rounded-lg shadow-lg">
                  <img
                    v-if="image.imageUrl"
                    :src="image.imageUrl"
                    :alt="'Listing Image ' + (index + 1)"
                    class="w-full h-full object-contain transition-transform duration-300 ease-in-out transform hover:scale-105"
                  />
                  <p v-else class="text-center py-8 text-gray-500">No image available</p>
                </div>
              </Slide>
            </Carousel>
  
            <!-- Navigation Buttons -->
            <button
              class="carousel-button absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
              @click="prevImage">&#9664;</button>
            <button
              class="carousel-button absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
              @click="nextImage">&#9654;</button>
          </div>
  
          <!-- Summary Section -->
          <div class="listing-summary mt-6 space-y-4">
            <div class="place-details text-lg text-gray-700">
              <p>Entire {{ listing.placeType }} · {{ listing.guests }} guests · {{ listing.bedrooms }} bedrooms · {{
                listing.bathrooms }} bathrooms</p>
            </div>
  
            <!-- Price Section (Host's View) -->
            <div class="price-section flex justify-between items-center">
              <p class="text-2xl font-semibold text-blue-600">₱{{ listing.price }} /Monthly</p>
              <span class="text-lg text-gray-500">Listing Active</span> <!-- Indicating the listing is active for the host -->
            </div>
          </div>
  
          <!-- Description Section -->
          <div class="listing-description mt-8">
            <h2 class="text-2xl font-semibold mb-2">Description</h2>
            <p class="text-gray-700">{{ listing.description }}</p>
          </div>
  
          <!-- Amenities Section -->
          <div v-if="listing.amenities && listing.amenities.length" class="listing-amenities mt-8">
            <h2 class="text-2xl font-semibold mb-2">Amenities</h2>
            <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <li v-for="amenity in listing.amenities" :key="amenity.name" class="flex items-center space-x-2">
                <i :class="amenity.iconClass" :style="{ color: amenity.color }" class="text-2xl"></i>
                <span class="text-gray-700">{{ amenity.name }}</span>
              </li>
            </ul>
          </div>
  
          <!-- Map Section -->
          <div class="listing-map mt-10">
            <h2 class="text-2xl font-semibold mb-4">Location</h2>
            <div id="map" class="map h-80 rounded-lg shadow-lg"></div>
          </div>
  
          <!-- Host Action Section -->
          <div class="host-actions mt-8 flex justify-between">
            <button
              class="edit-btn bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
              @click="handleEditListing">
              Edit Listing
            </button>
            <button
              class="delete-btn bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              @click="handleDeleteListing">
              Delete Listing
            </button>
          </div>
        </div>
  
        <!-- Registration Modal -->
        <Modal v-if="showRegisterModal" @close="showRegisterModal = false" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick } from 'vue';
  import { useRoute } from 'vue-router';
  import { Carousel, Slide } from 'vue3-carousel';
  import { Map, TileLayer, Marker } from 'leaflet';
  import 'vue3-carousel/dist/carousel.css'; // Add carousel CSS
  
  // Import headers
  import Header from '@/components/Header.vue';
  import DashHeader from '@/components/dashHeader.vue';
  
  const route = useRoute();
  const listingId = route.query.listingId;
  const listing = ref(null);
  const loading = ref(true);
  const currentIndex = ref(0); // To track the current image index
  const carouselRef = ref(null);
  const isLoggedIn = ref(false); // Ref to track login status
  
  // Function to check if the user is logged in
  function checkLoginStatus() {
    const token = localStorage.getItem('token');
    isLoggedIn.value = !!token;
  }
  
  // Function to go to the previous image and restart autoplay
  function prevImage() {
    currentIndex.value = (currentIndex.value - 1 + listing.value.images.length) % listing.value.images.length;
    resetAutoplay();
  }
  
  // Function to go to the next image and restart autoplay
  function nextImage() {
    currentIndex.value = (currentIndex.value + 1) % listing.value.images.length;
    resetAutoplay();
  }
  
  // Reset the autoplay after manually navigating images
  function resetAutoplay() {
    if (carouselRef.value) {
      carouselRef.value.resetAutoplay();
    }
  }
  
  // Initialize Leaflet map
  function initializeMap(lat, lng) {
    nextTick(() => {
      const map = new Map('map').setView([lat, lng], 14);
  
      new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
  
      new Marker([lat, lng]).addTo(map);
    });
  }
  
  // Fetch listing details on mount
  onMounted(async () => {
    checkLoginStatus(); // Check login status on mount
  
    const accessToken = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/listing/${listingId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch listing');
      listing.value = await response.json();
  
      // Initialize the map after loading the listing data
      if (process.client) {
        initializeMap(listing.value.latitude, listing.value.longitude);
      }
    } catch (err) {
      console.error('Error fetching listing:', err);
    } finally {
      loading.value = false;
    }
  });
  
  // Edit Listing handler
  function handleEditListing() {
    // Logic for editing the listing
    console.log('Edit listing button clicked');
  }
  
  // Delete Listing handler
  function handleDeleteListing() {
    // Logic for deleting the listing
    console.log('Delete listing button clicked');
  }
  </script>
  
  <style scoped>
  .listing-container {
    max-width: 7xl;
    margin: 0 auto;
    padding: 8px;
  }
  
  .listing-header {
    margin-bottom: 16px;
  }
  
  .carousel-wrapper {
    position: relative;
  }
  
  /* Image styling for a professional look */
  .carousel-wrapper .w-full {
    max-width: 100%;
    height: auto;
  }
  
  .carousel-wrapper img {
    object-fit: contain;
    transition: transform 0.3s ease-in-out;
  }
  
  .carousel-wrapper img:hover {
    transform: scale(1.05);
  }
  
  /* Add shadow and spacing to image container */
  .carousel-wrapper .shadow-lg {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Button styling for Host's view */
  .edit-btn, .delete-btn {
    width: 48%;
  }
  
  .host-actions {
    display: flex;
    justify-content: space-between;
  }
  </style>
  