<template>
  <div ref="mapContainer" id="mapContainer" class="h-full w-full"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import 'leaflet/dist/leaflet.css';
import eventBus from '~/utils/eventBus';

const mapContainer = ref(null);
const mapInstance = ref(null);
const markers = ref({});

const zoomLevel = 14;
const davaoCenter = [7.0658, 125.6121];
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileAttribution = '© OpenStreetMap contributors';

const initializeMap = async () => {
  if (mapContainer.value) {
    try {
      const L = (await import('leaflet')).default;

      mapInstance.value = L.map(mapContainer.value).setView(davaoCenter, zoomLevel);
      L.tileLayer(tileUrl, { attribution: tileAttribution }).addTo(mapInstance.value);

      const response = await fetch('/api/listings');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const listings = await response.json();

      listings.forEach((listing) => {
        if (listing.latitude && listing.longitude) {
          const popupContent = `
            <div>
              <b>${listing.title}</b><br>
              <img src="${listing.images && listing.images.length > 0 ? listing.images[0].imageUrl : 'default-image-url'}" alt="Listing Image" style="width: 150px; height: 100px; object-fit: cover;" /><br>
              ${listing.description || 'No description available'}<br>
              <strong>Price:</strong> ₱${listing.price.toFixed(2)} /Month
            </div>
          `;

          const marker = L.marker([listing.latitude, listing.longitude])
            .bindPopup(popupContent)
            .addTo(mapInstance.value);

          // Emit an event when the marker is clicked
          marker.on('click', () => {
            eventBus.emit('showListingDetails', listing.listingId); // Show details in the listing bar
            zoomToMarker(listing.listingId); // Zoom to the clicked marker
          });

          markers.value[listing.listingId] = marker;
        }
      });

      // Listen for zoomToMarker events
      eventBus.on('zoomToMarker', zoomToMarker);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }
};

// Function to zoom to a specific marker by listingId
const zoomToMarker = (listingId) => {
  const marker = markers.value[listingId];
  if (marker) {
    const latLng = marker.getLatLng();
    mapInstance.value.setView(latLng, zoomLevel);
    marker.openPopup(); // Open the marker's popup
  } else {
    console.error(`Marker not found for listingId: ${listingId}`);
  }
};

// Initialize the map when the component is mounted
onMounted(() => {
  initializeMap();
});
</script>

<style scoped>
#mapContainer {
  height: 100%;
  width: 100%;
  z-index: 1; /* Set a lower z-index for the map */
}
</style>
