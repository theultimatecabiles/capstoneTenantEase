<template>
  <div ref="mapContainer" id="mapContainer" class="h-full w-full"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import eventBus from '~/utils/eventBus';

const mapContainer = ref(null);
const mapInstance = ref(null);
const markers = ref({});
const routingControl = ref(null);
const startPoint = ref(null);
const endPoint = ref(null);

const zoomLevel = 14;
const davaoCenter = [7.0658, 125.6121];
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileAttribution = '© OpenStreetMap contributors';

const initializeMap = async () => {
  if (mapContainer.value) {
    try {
      const L = (await import('leaflet')).default;
      await import('leaflet-routing-machine');

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
              <img src="${listing.images && listing.images.length > 0 ? listing.images[0].imageUrl : 'default-image-url'}" 
                   alt="Listing Image" 
                   style="width: 150px; height: 100px; object-fit: cover;" />
              <br>${listing.description || 'No description available'}<br>
              <strong>Price:</strong> ₱${listing.price.toFixed(2)} /Month
            </div>
          `;
          const marker = L.marker([listing.latitude, listing.longitude])
            .bindPopup(popupContent)
            .addTo(mapInstance.value);

          marker.on('click', () => {
            endPoint.value = marker.getLatLng();
            eventBus.emit('showListingDetails', listing.listingId);
            zoomToMarker(listing.listingId);
          });

          markers.value[listing.listingId] = marker;
        }
      });

      mapInstance.value.on('click', handleMapClick);
      eventBus.on('zoomToMarker', zoomToMarker);

      // Add event listeners for map movements
      mapInstance.value.on('zoomend moveend', () => {
        setTimeout(redrawRoute, 100); // Small delay to ensure map has updated
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }
};

const zoomToMarker = (listingId) => {
  const marker = markers.value[listingId];
  if (marker) {
    const latLng = marker.getLatLng();
    mapInstance.value.flyTo(latLng, zoomLevel, {
      duration: 1 // Duration of the animation in seconds
    });
    marker.openPopup();
  } else {
    console.error(`Marker not found for listingId: ${listingId}`);
  }
};

const createRoute = (start, end) => {
  if (routingControl.value) {
    mapInstance.value.removeControl(routingControl.value);
  }

  routingControl.value = L.Routing.control({
    waypoints: [
      L.latLng(start.lat, start.lng),
      L.latLng(end.lat, end.lng),
    ],
    routeWhileDragging: true,
    addWaypoints: false,
  }).addTo(mapInstance.value);
};

const handleMapClick = (e) => {
  if (endPoint.value) {
    startPoint.value = e.latlng;
    createRoute(startPoint.value, endPoint.value);
  } else {
    console.warn('No marker selected. Click on a marker first to set the endpoint.');
  }
};

const redrawRoute = () => {
  if (startPoint.value && endPoint.value) {
    createRoute(startPoint.value, endPoint.value);
  }
};

onMounted(() => {
  initializeMap();
});
</script>

<style scoped>
#mapContainer {
  height: 100%;
  width: 100%;
  z-index: 1;
}
</style>