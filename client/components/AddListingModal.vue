<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-auto">
      <h2 class="text-2xl font-semibold mb-6">Add a New Listing</h2>
      <form @submit.prevent="handleNext">
        <!-- Title field -->
        <div class="mb-6">
          <label class="block text-gray-700 text-lg font-medium mb-2">Title</label>
          <input type="text" v-model="listing.title" class="w-full p-4 border border-gray-300 rounded-lg shadow-sm" required />
        </div>
        
        <!-- Description field -->
        <div class="mb-6">
          <label class="block text-gray-700 text-lg font-medium mb-2">Description</label>
          <textarea v-model="listing.description" class="w-full p-4 border border-gray-300 rounded-lg shadow-sm" rows="5" required></textarea>
        </div>

        <!-- Address field -->
        <div class="mb-6">
          <label class="block text-gray-700 text-lg font-medium mb-2">Address</label>
          <input type="text" v-model="listing.address" class="w-full p-4 border border-gray-300 rounded-lg shadow-sm" required />
        </div>
        
        <!-- Price field -->
        <div class="mb-6">
          <label class="block text-gray-700 text-lg font-medium mb-2">Price</label>
          <div class="relative">
            <input type="number" v-model="listing.price" class="w-full p-4 pl-12 pr-20 border border-gray-300 rounded-lg shadow-sm" required />
            <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-700">₱</span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700">/monthly</span>
          </div>
        </div>
        
        <!-- Place Type dropdown -->
        <div class="mb-6">
          <label class="block text-gray-700 text-lg font-medium mb-2">How do you describe your place?</label>
          <select v-model="listing.placeTypeId" class="w-full p-4 border border-gray-300 rounded-lg shadow-sm" required>
            <option value="" disabled>Select place type</option>
            <option v-for="type in placeTypes" :key="type.placeTypeId" :value="type.placeTypeId">{{ type.placeTypeName }}</option>
          </select>
        </div>
        
        <!-- Guest Type dropdown -->
        <div class="mb-6">
          <label class="block text-gray-700 text-lg font-medium mb-2">What type of place will the guests have?</label>
          <select v-model="listing.guestTypeId" class="w-full p-4 border border-gray-300 rounded-lg shadow-sm" required>
            <option value="" disabled>Select guest type</option>
            <option v-for="type in guestTypes" :key="type.guestTypeId" :value="type.guestTypeId">{{ type.guestTypeName }}</option>
          </select>
        </div>
        
        <!-- Basic information fields -->
        <div class="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700 text-lg font-medium mb-2">Number of Guests</label>
            <input type="number" v-model="listing.guests" class="w-full p-4 border border-gray-300 rounded-lg shadow-sm" required />
          </div>
          <div>
            <label class="block text-gray-700 text-lg font-medium mb-2">Bedrooms</label>
            <input type="number" v-model="listing.bedrooms" class="w-full p-4 border border-gray-300 rounded-lg shadow-sm" required />
          </div>
          <div>
            <label class="block text-gray-700 text-lg font-medium mb-2">Beds</label>
            <input type="number" v-model="listing.beds" class="w-full p-4 border border-gray-300 rounded-lg shadow-sm" required />
          </div>
          <div>
            <label class="block text-gray-700 text-lg font-medium mb-2">Bathrooms</label>
            <input type="number" v-model="listing.bathrooms" class="w-full p-4 border border-gray-300 rounded-lg shadow-sm" required />
          </div>
        </div>
        
        <!-- Amenities checklist -->
        <div class="mb-6">
          <label class="block text-gray-700 text-lg font-medium mb-2">Amenities</label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <label class="flex items-center" v-for="amenity in amenities" :key="amenity.amenityId">
              <input type="checkbox" :value="amenity.amenityId" v-model="selectedAmenities" class="mr-2" />
              <i :class="amenity.iconClass + ' mr-2'" :style="{ color: amenity.color }"></i> {{ amenity.amenityName }}
            </label>
          </div>
        </div>
        
        <!-- Image upload section -->
        <div class="mb-6">
          <label class="block text-gray-700 text-lg font-medium mb-2">Upload Images (at least 6)</label>
          <div class="flex items-center mb-4">
            <label for="image-upload" class="cursor-pointer flex items-center bg-gray-200 p-3 rounded-lg shadow-sm hover:bg-gray-300">
              <i class="fas fa-upload text-gray-600 mr-2"></i>
              <span>Choose files</span>
              <input type="file" id="image-upload" accept="image/*" @change="handleImageUpload" class="hidden" multiple />
            </label>
          </div>
          <div v-if="previews.length" class="flex flex-wrap gap-4">
            <div v-for="(preview, index) in previews" :key="index" class="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
              <img :src="preview" class="w-full h-full object-cover" />
              <button type="button" @click="removeImage(index)" class="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1 text-xs">
                &times;
              </button>
            </div>
          </div>
        </div>
        
        <!-- Leaflet Map for pinpointing the exact location -->
        <div class="mb-6">
          <label class="block text-gray-700 text-lg font-medium mb-2">Pinpoint the exact location</label>
          <div id="map" class="h-64 w-full rounded-lg border border-gray-300"></div>
        </div>

        <!-- Navigation buttons -->
        <div class="flex justify-end gap-4">
          <button type="button" class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600" @click="closeModal">Cancel</button>
          <button type="submit" class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'

const listing = ref({
  title: '',
  description: '',
  price: '',
  address: '',
  placeTypeId: null,
  guestTypeId: null,
  guests: '',
  bedrooms: '',
  beds: '',
  bathrooms: '',
  amenities: [],
  location: {
    lat: null,
    lng: null,
  },
});

const images = ref([]);
const previews = ref([]);
const placeTypes = ref([]);
const guestTypes = ref([]);
const amenities = ref([]);
const selectedAmenities = ref([]);
const emit = defineEmits();
const userId = ref(localStorage.getItem('userId'));

const closeModal = () => {
  emit('close');
};

const handleImageUpload = (event) => {
  const files = event.target.files;
  if (files.length) {
    const fileArray = Array.from(files);

    fileArray.forEach(file => {
      images.value.push(file);
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const previewUrl = e.target.result;
        previews.value.push(previewUrl);
      };
      
      reader.readAsDataURL(file);
    });
  }
};

const removeImage = (index) => {
  images.value.splice(index, 1);
  previews.value.splice(index, 1);
};

const fetchPlaceTypes = async () => {
  const response = await fetch('/api/placeTypes');
  placeTypes.value = await response.json();
};

const fetchGuestTypes = async () => {
  const response = await fetch('/api/guestTypes');
  guestTypes.value = await response.json();
};

const fetchAmenities = async () => {
  const response = await fetch('/api/amenities');
  amenities.value = await response.json();
};

const initMap = () => {
  const map = L.map('map').setView([7.0658, 125.6121], 14); // Default center on Davao City
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // Variable to store the current marker
  let marker = null;

  // Listen for map clicks
  map.on('click', (e) => {
    const { lat, lng } = e.latlng;

    // Remove existing marker if it exists
    if (marker) {
      map.removeLayer(marker);
    }
    
    // Add a new marker at the clicked location
    marker = L.marker([lat, lng]).addTo(map);

    // Update listing location
    listing.value.location = { lat, lng };
  });
};

onMounted(async () => {
  await fetchPlaceTypes();
  await fetchGuestTypes();
  await fetchAmenities();
  initMap();
});

const handleNext = async () => {
  try {
    const formData = new FormData();

    formData.append('title', listing.value.title);
    formData.append('description', listing.value.description);
    formData.append('price', listing.value.price);
    formData.append('address', listing.value.address);
    formData.append('placeTypeId', listing.value.placeTypeId);
    formData.append('guestTypeId', listing.value.guestTypeId);
    formData.append('guests', listing.value.guests);
    formData.append('bedrooms', listing.value.bedrooms);
    formData.append('beds', listing.value.beds);
    formData.append('bathrooms', listing.value.bathrooms);
    formData.append('latitude', listing.value.location.lat);
    formData.append('longitude', listing.value.location.lng);
    formData.append('userId', userId.value);
    formData.append('amenities', selectedAmenities.value.join(',')); // Send amenities as a comma-separated string

    images.value.forEach((file) => {
      formData.append('images', file);
    });

    const response = await fetch('/api/listings', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      closeModal();
      window.location.reload();
    } else {
      alert(result.error || 'An error occurred');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('An error occurred');
  }
};
</script>



<style scoped>
/* Add your custom styles here */
</style>
