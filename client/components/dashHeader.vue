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
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">Notification Details</h2>
        <div v-if="selectedBooker">
          <h3 class="text-xl font-semibold mb-2">Booker Information</h3>
          <p><strong>Name:</strong> {{ selectedBooker.name }}</p>
          <p><strong>Email:</strong> {{ selectedBooker.email }}</p>
          <p v-if="selectedBooker.phone"><strong>Phone:</strong> {{ selectedBooker.phone }}</p>
        </div>
        <div v-if="selectedListing" class="mt-4">
          <h3 class="text-xl font-semibold mb-2">Listing Information</h3>
          <p><strong>Title:</strong> {{ selectedListing.title }}</p>
          <p><strong>Address:</strong> {{ selectedListing.address }}</p>
          <p><strong>Description:</strong> {{ selectedListing.description }}</p>
        </div>
        <button @click="closeNotificationModal" class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Close</button>
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
      showDropdown: false,
      showAddListingModal: false,
      showNotificationDropdown: false,
      showMessageDropdown: false,
      notifications: [],
      userId: null,
      showNotificationModal: false,
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
        const response = await axios.get('/api/notifications', {
          params: { userId: userId },
        });
        this.notifications = response.data;
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    },
    async logNotificationDetails(notification) {
      console.log('Notification clicked:', notification);

      try {
        const [bookerResponse, listingResponse] = await Promise.all([
          axios.get(`/api/user/${notification.bookerId}`),
          axios.get(`/api/listing/${notification.listingId}`)
        ]);

        console.log('Booker response:', bookerResponse.data);
        console.log('Listing response:', listingResponse.data);

        // Extract the data from the 'body' property
        this.selectedBooker = bookerResponse.data.body;
        this.selectedListing = listingResponse.data.body;

        console.log('Selected booker:', this.selectedBooker);
        console.log('Selected listing:', this.selectedListing);

        this.showNotificationModal = true;
      } catch (error) {
        console.error('Error fetching notification details:', error);
        // You might want to show an error message to the user here
      }
    },
    closeNotificationModal() {
      this.showNotificationModal = false;
      this.selectedBooker = null;
      this.selectedListing = null;
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