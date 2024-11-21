<template>
  <header class="bg-white border-b border-gray-200 p-4 relative z-1000">
    <nav class="container mx-auto flex justify-between items-center">
      <!-- Branding on the left -->
      <NuxtLink to="/dashboard">
        <div class="text-4xl font-extrabold text-red-500 flex-shrink-0">
          TenantEase
        </div>
      </NuxtLink>
      
      <!-- Notification and Message Icons -->
      <div class="flex space-x-6 items-center relative">
        <!-- Notification Icon (Font Awesome Bell) -->
        <div class="relative">
          <i
            @click="toggleNotificationDropdown"
            class="fa-solid fa-bell text-2xl text-red-500 hover:text-red-600 cursor-pointer transition duration-300"
          ></i>
          <div
            v-if="showNotificationDropdown"
            class="absolute right-0 mt-2 w-60 bg-white border border-red-300 rounded-lg shadow-lg z-1001"
          >
            <div class="px-4 py-2 text-red-700">
              You have {{ notifications.length }} new notifications
            </div>
            <a
              v-for="notification in notifications"
              :key="notification.notificationId"
              href="#"
              class="block px-4 py-2 text-red-700 hover:bg-red-100"
              @click.prevent="logNotificationDetails(notification)"
            >
              {{ notification.content }}
            </a>
          </div>
        </div>

        <!-- Message Icon (Font Awesome Envelope) -->
        <div class="relative">
          <i
            @click="toggleMessageDropdown"
            class="fa-solid fa-envelope text-2xl text-red-500 hover:text-red-600 cursor-pointer transition duration-300"
          ></i>
          <div
            v-if="showMessageDropdown"
            class="absolute right-0 mt-2 w-60 bg-white border border-red-300 rounded-lg shadow-lg z-1001"
          >
            <div class="px-4 py-2 text-red-700">You have 2 new messages</div>
            <a href="#" class="block px-4 py-2 text-red-700 hover:bg-red-100">Message 1</a>
            <a href="#" class="block px-4 py-2 text-red-700 hover:bg-red-100">Message 2</a>
          </div>
        </div>

        <!-- Profile Icon (Font Awesome User) -->
        <div class="relative">
          <i
            @click="toggleDropdown"
            class="fa-solid fa-user text-2xl text-red-500 hover:text-red-600 cursor-pointer transition duration-300"
          ></i>
          <div
            v-if="showDropdown"
            class="absolute right-0 mt-2 w-48 bg-white border border-red-300 rounded-lg shadow-lg z-1001"
          >
            <router-link
              to="/profile"
              class="block px-4 py-2 text-red-700 hover:bg-red-100"
            >
              Profile
            </router-link>
            <router-link
              to="/listings"
              class="block px-4 py-2 text-red-700 hover:bg-red-100"
            >
              Your Listings
            </router-link>
            <a
              href="#"
              class="block px-4 py-2 text-red-700 hover:bg-red-100"
              @click="toggleAddListingModal"
            >
              Add Listing
            </a>
            <router-link
              to="/hostPayments"
              class="block px-4 py-2 text-red-700 hover:bg-red-100"
            >
              Payments
            </router-link>
            <a
              href="#"
              class="block px-4 py-2 text-red-700 hover:bg-red-100"
              @click="logout"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Add Listing Modal -->
    <AddListingModal v-if="showAddListingModal" @close="toggleAddListingModal" />

    <!-- Notification Details Modal -->
    <div v-if="showNotificationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1002">
  <div class="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full transition-all transform scale-100 duration-300 ease-in-out">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-900">Notification Details</h2>
      <button @click="closeNotificationModal" class="text-gray-500 hover:text-gray-700 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Booker Information with Profile Picture and Document Button -->
    <div v-if="selectedBooker" class="mb-8">
      <h3 class="text-lg font-medium text-gray-800 mb-3">Booker Information</h3>
      <div v-if="selectedBooker.profilePic" class="mt-4">
        <p><strong>Profile Picture:</strong></p>
        <img
          v-if="selectedBooker.profilePic"
          :src="selectedBooker.profilePic"
          alt="Profile Picture"
          class="w-20 h-20 object-cover rounded-full border-2 border-gray-300 shadow-sm"
        />
      </div>
      <div class="space-y-2">
        <p><strong>Name:</strong> {{ selectedBooker.name }}</p>
        <p><strong>Email:</strong> {{ selectedBooker.email }}</p>
        <p v-if="selectedBooker.phone"><strong>Phone:</strong> {{ selectedBooker.phone }}</p>
      </div>

      <div v-if="selectedBooker.document" class="mt-4">
        <p><strong>Booker Document:</strong></p>
        <button @click="toggleDocumentModal" class="text-blue-600 hover:underline font-medium">
          View Document
        </button>
      </div>
    </div>

    <!-- Listing Information with Listing Image -->
    <div v-if="selectedListing" class="mb-8">
      <h3 class="text-lg font-medium text-gray-800 mb-3">Listing Information</h3>

      <div v-if="selectedListing.images && selectedListing.images.length" class="mt-4">
        <h4 class="text-md font-medium text-gray-800 mb-2">Listing Images:</h4>
        <div class="flex space-x-4 overflow-x-auto">
          <img
            v-for="(image, index) in selectedListing.images"
            :key="index"
            :src="image.imageUrl"
            alt="Listing Image"
            class="w-32 h-32 object-cover rounded-md shadow-sm"
          />
        </div>
      </div>
      
      <div class="space-y-2">
        <p><strong>Title:</strong> {{ selectedListing.title }}</p>
        <p><strong>Description:</strong> {{ selectedListing.description }}</p>
        <p><strong>Address:</strong> {{ selectedListing.address }}</p>
        <p><strong>Price:</strong> {{ selectedListing.price | currency }}</p>
      </div>
    </div>

    <div class="flex justify-between items-center">
  <button 
    @click="rejectBooking" 
    class="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 focus:outline-none transition duration-200">
    Reject
  </button>
  <button 
    @click="approveBooking" 
    class="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 focus:outline-none transition duration-200 ml-auto">
    Approve
  </button>
</div>
  </div>
</div>

<!-- Document Modal for Viewing Full Image -->
<div v-if="showDocumentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1003">
  <div class="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full transition-all transform scale-100 duration-300 ease-in-out">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-900">Document Image</h2>
      <button @click="toggleDocumentModal" class="text-gray-500 hover:text-gray-700 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <img :src="selectedBooker.document" alt="Document Image" class="w-full h-auto rounded mb-4 shadow-sm" />
    <div class="flex justify-start">
      <button @click="toggleDocumentModal" class="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 focus:outline-none transition duration-200">
        Close
      </button>
    </div>
  </div>
</div>


  </header>
</template>

<script>
import AddListingModal from '@/components/AddListingModal.vue';
import axios from 'axios';

export default {
  name: 'dashHeader',
  components: {
    AddListingModal,
  },
  data() {
    return {
      // Existing properties
      showDropdown: false,
      showAddListingModal: false,
      showNotificationDropdown: false,
      showMessageDropdown: false,
      notifications: [],
      userId: null,
      showNotificationModal: false,
      showDocumentModal: false, // New property for document modal
      selectedBooker: null,
      selectedListing: null,
    };
  },
  mounted() {
    if (process.client) {
      this.userId = localStorage.getItem('userId');
      if (this.userId) {
        this.fetchNotifications(this.userId);
      }
    }
  },
  methods: {
    // Existing methods
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    toggleAddListingModal() {
      this.showAddListingModal = !this.showAddListingModal;
    },
    toggleNotificationDropdown() {
      this.showNotificationDropdown = !this.showNotificationDropdown;
      if (this.showNotificationDropdown) {
        this.fetchNotifications(this.userId);
      }
      this.showMessageDropdown = false;
    },
    toggleMessageDropdown() {
      this.showMessageDropdown = !this.showMessageDropdown;
      this.showNotificationDropdown = false;
    },
    async fetchNotifications(userId) {
      try {
        const response = await axios.get('/api/notifications', { params: { userId } });
        this.notifications = response.data;
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    },
    async logNotificationDetails(notification) {
  try {
    const [bookerResponse, listingResponse] = await Promise.all([
      axios.get(`/api/user/${notification.bookerId}`),
      axios.get(`/api/listing/${notification.listingId}`)
    ]);

    if (bookerResponse.data && bookerResponse.data.body) {
      this.selectedBooker = bookerResponse.data.body; // Directly use "body"
    }

    if (listingResponse.data && listingResponse.data.body) {
      this.selectedListing = listingResponse.data.body.listing;
    }

    if (this.selectedBooker && this.selectedListing) {
      this.showNotificationModal = true;
    }
  } catch (error) {
    console.error('Error fetching notification details:', error);
  }
},
    toggleDocumentModal() {
      this.showDocumentModal = !this.showDocumentModal;
    },
    async approveBooking() {
      try {
        await axios.put('/api/notification/approve', { notificationId: this.selectedNotificationId });
        this.fetchNotifications();
        this.closeNotificationModal();
      } catch (error) {
        console.error('Error approving booking:', error);
      }
    },  
    closeNotificationModal() {
      this.showNotificationModal = false;
      this.selectedBooker = null;
      this.selectedListing = null;
      this.showDocumentModal = false; // Also close document modal if open
    },
    async logout() {
      try {
        const response = await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: localStorage.getItem('token') }),
        });

        if (response.ok) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          this.$router.push('/');
        } else {
          const errorData = await response.json();
          console.error('Logout failed:', errorData);
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
  },
};
</script>


<style scoped>
.dashHeader {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 9999;
  background-color: white;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.notification-dropdown,
.message-dropdown,
.profile-dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  width: 220px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10000;
}

.notification-dropdown {
  z-index: 10001;
}

.message-dropdown {
  z-index: 10002;
}

.profile-dropdown {
  z-index: 10003;
}

.notification-dropdown a,
.message-dropdown a,
.profile-dropdown a {
  padding: 12px 16px;
  display: block;
  color: #1f2937;
  text-decoration: none;
  font-size: 14px;
}

.notification-dropdown a:hover,
.message-dropdown a:hover,
.profile-dropdown a:hover {
  background-color: #f3f4f6;
}
</style>