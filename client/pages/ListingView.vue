<template>
  <div>
    <!-- Conditionally Render Header or dashHeader based on authentication status -->
    <Header v-if="!isLoggedIn" />
    <userHeader v-else />

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
          <h1 class="text-3xl font-bold text-red-500 mb-2">{{ listing.title }}</h1>
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

          <div class="reserve-container flex justify-between items-center">
            <p class="text-2xl font-semibold text-red-600">₱{{ listing.price }} /Monthly</p>
            <button
              class="reserve-btn bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              @click="handleReserve()">
              Book
            </button>
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
import 'vue3-carousel/dist/carousel.css';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axios from 'axios';

import Header from '@/components/Header.vue';
import UserHeader from '~/components/userHeader.vue';

const route = useRoute();
const listingId = route.query.listingId;
const hostId = route.query.hostid;
const listing = ref(null);
const loading = ref(true);
const currentIndex = ref(0);
const carouselRef = ref(null);
const isLoggedIn = ref(false);
const bookingDate = ref(new Date());
let userId = null;

if (process.client) {
  userId = localStorage.getItem('userId');
}

function checkLoginStatus() {
  if (process.client) {
    const token = localStorage.getItem('token');
    isLoggedIn.value = !!token;
  }
}

function prevImage() {
  currentIndex.value = (currentIndex.value - 1 + listing.value.images.length) % listing.value.images.length;
  resetAutoplay();
}

function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % listing.value.images.length;
  resetAutoplay();
}

function resetAutoplay() {
  if (carouselRef.value) {
    carouselRef.value.resetAutoplay();
  }
}

function initializeMap(lat, lng) {
  if (process.client) {
    import('leaflet').then(({ Map, TileLayer, Marker }) => {
      nextTick(() => {
        const map = new Map('map').setView([lat, lng], 14);
        new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        new Marker([lat, lng]).addTo(map);
      });
    });
  }
}

onMounted(async () => {
  checkLoginStatus(); // Check login status on mount
  const accessToken = process.client ? localStorage.getItem('token') : null;
  try {
    const response = await fetch(`/api/listing/${listingId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch listing');
    
    // Access the listing object from the response
    const data = await response.json();
    listing.value = data.body.listing;

    // Initialize the map after loading the listing data
    if (listing.value.latitude && listing.value.longitude) {
      initializeMap(listing.value.latitude, listing.value.longitude);
    }
  } catch (err) {
    console.error('Error fetching listing:', err);
  } finally {
    loading.value = false;
  }
});

async function handleReserve() {
  try {
    const notificationResponse = await axios.post('/api/notification', {
      hostId: parseInt(hostId, 10),
      bookerId: parseInt(userId, 10),
      listingId: parseInt(listingId, 10),
      content: 'You have a new booking request!',
      type: 'newBookingRequest'
    });

    if (notificationResponse.status === 200) {
      const bookingResponse = await axios.post('/api/booking', {
        listingId: parseInt(listingId, 10),
        userId: parseInt(userId, 10),
        bookingDate: bookingDate.value,
        statusId: 1,
      });

      if (bookingResponse.status === 200) {
        toast.success("Your booking request has been sent. Please hold on for confirmation.", {
          autoClose: 2000,
        });
      }
    }
  } catch (error) {
    console.error('Error creating booking or notification:', error);
    toast.error('Error creating booking or notification. Please try again.', {
      autoClose: 2000,
    });
  }
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
.carousel-wrapper div {
  margin-bottom: 16px;
  padding: 8px;
}

.listing-details {
  margin-top: 16px;
}

/* Styling for amenities and location */
.listing-amenities {
  margin-top: 32px;
}

.listing-map {
  margin-top: 32px;
}

.map {
  height: 400px;
}
</style>