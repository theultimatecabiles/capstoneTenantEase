<template>
  <header class="bg-white border-b border-gray-200 p-4 relative z-1000">
    <nav class="container mx-auto flex justify-between items-center">
      <!-- Branding on the left -->
      <div class="text-4xl font-extrabold text-red-500 flex-shrink-0">
        TenantEase
      </div>
    
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
            <div v-if="notifications.length === 0" class="px-4 py-2 text-gray-500">
              No new notifications
            </div>
            <a
              v-for="notification in notifications"
              :key="notification.id"
              href="#"
              class="block px-4 py-2 text-red-700 hover:bg-red-100"
              @click.prevent="logNotificationDetails(notification)"
            >
              {{ notification.message }}
            </a>
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


  </header>
</template>

<script>
import axios from 'axios';

export default {
  name: 'adminHeader',
  data() {
    return {
      showDropdown: false,
      showNotificationDropdown: false,
      showMessageDropdown: false,
      notifications: [],
      userId: null,
      showNotificationModal: false,
      selectedBooker: null,
      selectedListing: null,
      selectedNotificationId: null,
    };
  },
  mounted() {
    if (process.client) {
      this.userId = localStorage.getItem('userId');
      if (this.userId) {
        this.fetchNotifications();
      }
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },

    toggleNotificationDropdown() {
      this.showNotificationDropdown = !this.showNotificationDropdown;
      if (this.showNotificationDropdown) {
        this.fetchNotifications();
      }
      this.showMessageDropdown = false;
    },

    async fetchNotifications() {
      try {
        const response = await axios.get('/api/admin/notifications');
        this.notifications = response.data;
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    },

    async logNotificationDetails(notification) {
      this.selectedNotificationId = notification.id;
      this.showNotificationModal = true;
      try {
        const response = await axios.get(`/api/admin/notification/${notification.id}`);
        this.selectedBooker = response.data.booker;
        this.selectedListing = response.data.listing;
      } catch (error) {
        console.error('Error fetching notification details:', error);
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