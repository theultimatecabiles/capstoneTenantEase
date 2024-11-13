<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-auto">
      <h2 class="text-2xl font-semibold mb-6">Update Listing</h2>
      <form @submit.prevent="handleUpdate">
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
        
        <!-- Place Type Dropdown -->
        <div>
          <label for="placeType">Place Type</label>
          <select id="placeType" v-model="placeType" class="w-full p-4 pl-12 pr-20 border border-gray-300 rounded-lg shadow-sm">
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Boarding House">Boarding House</option>
            <option value="Studio Type">Studio Type</option>
            <option value="Room with Owner">Room with Owner</option>
          </select>
        </div>

        <!-- Guest Type Dropdown -->
        <div>
          <label for="guestType">Guest Type</label>
          <select id="guestType" v-model="guestType" class="w-full p-4 pl-12 pr-20 border border-gray-300 rounded-lg shadow-sm">
            <option value="The entire place">The entire place</option>
            <option value="Only a room">Only a room</option>
            <option value="Shared room">Shared room</option>
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
        <div>
          <h3>Amenities</h3>
          <div v-for="amenity in availableAmenities" :key="amenity.name" class="flex items-center mb-2">
            <input
              type="checkbox"
              :id="amenity.name"
              :value="amenity.name"
              v-model="selectedAmenities"
              class="mr-2"
            />
            <label :for="amenity.name" class="flex items-center">
              <i :class="amenity.iconClass" :style="{ color: amenity.color }" class="mr-2"></i>
              {{ amenity.name }}
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
          <button type="submit" class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">Update Listing</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const props = defineProps({
  listing: Object
});

const emit = defineEmits(['close']);
const selectedImages = ref([]);
const previews = ref([]);
const selectedAmenities = ref([]);
const guestType = ref('');
const placeType = ref('');

const closeModal = () => {
  emit('close');
};

const availableAmenities = ref([
  { name: 'Wi-Fi', iconClass: 'fas fa-wifi', color: '#4CAF50' },
  { name: 'TV', iconClass: 'fas fa-tv', color: '#FFC107' },
  { name: 'Parking Lot', iconClass: 'fas fa-parking', color: '#2196F3' },
  { name: 'Paid Parking', iconClass: 'fas fa-dollar-sign', color: '#4CAF50' },
  { name: 'Air Conditioning', iconClass: 'fas fa-snowflake', color: '#FF5722' },
  { name: 'Own Workspace', iconClass: 'fas fa-laptop', color: '#4CAF50' },
  { name: 'Kitchen', iconClass: 'fas fa-utensils', color: '#4CAF50' },
  { name: 'Washer', iconClass: 'fas fa-tshirt', color: '#2196F3' },
  // Add more amenities as needed
]);
const map = ref(null);

onMounted(() => {
  console.log("listing")
  console.log(props.listing)
  const  latitude  = props.listing.latitude
  const  longitude  = props.listing.longitude
  if (!map.value) {
    // Initialize the map with dynamic coordinates
    map.value = L.map('map').setView([latitude, longitude], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.value);

    // Add marker at the listing's coordinates
    L.marker([latitude, longitude]).addTo(map.value);
  }
});

// Watch for changes in the listing prop and update selected amenities
watch(
  () => props.listing,
  (newListing) => {
    if (newListing) {
      // Set selected amenities
      selectedAmenities.value = newListing.amenities.map(amenity => amenity.name);

      // Set placeType and guestType based on new listing
      placeType.value = newListing.placeType || '';
      guestType.value = newListing.guestType || '';
    }
  },
  { immediate: true }
);


const handleImageUpload = (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previews.value.push(e.target.result);
    };
    reader.readAsDataURL(files[i]);
    selectedImages.value.push(files[i]);
  }
};

const removeImage = (index) => {
  previews.value.splice(index, 1);
  selectedImages.value.splice(index, 1);
};

const handleUpdate = async () => {
  const formData = new FormData();
  formData.append('title', props.listing.title);
  formData.append('description', props.listing.description);
  formData.append('price', props.listing.price);
  formData.append('address', props.listing.address);
  formData.append('location', JSON.stringify(props.listing.location)); // Latitude and Longitude
  formData.append('placeType', placeType.value);
  formData.append('guestType', guestType.value);
  formData.append('guests', props.listing.guests);
  formData.append('bedrooms', props.listing.bedrooms);
  formData.append('beds', props.listing.beds);
  formData.append('bathrooms', props.listing.bathrooms);
  formData.append('amenities', JSON.stringify(selectedAmenities.value));

  selectedImages.value.forEach(image => {
    formData.append('images', image);
  });

  // Log all the form data for debugging
  console.log('Title:', props.listing.title);
  console.log('Description:', props.listing.description);
  console.log('Price:', props.listing.price);
  console.log('Address:', props.listing.address);
  console.log('Location:', props.listing.location);
  console.log('Place Type:', placeType.value);
  console.log('Guest Type:', guestType.value);
  console.log('Number of Guests:', props.listing.guests);
  console.log('Bedrooms:', props.listing.bedrooms);
  console.log('Beds:', props.listing.beds);
  console.log('Bathrooms:', props.listing.bathrooms);
  console.log('Amenities:', selectedAmenities.value);
  console.log('Selected Images:', selectedImages.value);

  // try {
  //   const response = await fetch(`/api/listings/${props.listing.id}`, {
  //     method: 'PUT',
  //     body: formData,
  //   });
  //   const result = await response.json();
  //   if (result.success) {
  //     emit('close');
  //   } else {
  //     alert('Failed to update listing');
  //   }
  // } catch (error) {
  //   console.error(error);
  //   alert('Error updating listing');
  // }
};



</script>

<style scoped>
#map {
  height: 300px;
  width: 100%;
}
</style>