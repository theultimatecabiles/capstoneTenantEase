<template>
  <header class="bg-white border-b border-gray-200 p-4 relative z-50">
    <nav class="container mx-auto flex justify-between items-center">
      <!-- Branding on the left -->
      <NuxtLink to="/userDashboard">
        <div class="text-4xl font-extrabold text-red-500 flex-shrink-0">
          TenantEase
        </div>
      </NuxtLink>

      <!-- Notification and Message Icons -->
      <div class="flex space-x-6 items-center relative">
        <!-- Notification Icon -->
        <div class="relative">
          <i
            @click="toggleNotificationDropdown"
            class="fa-solid fa-bell text-2xl text-red-500 hover:text-red-600 cursor-pointer transition duration-300"
          ></i>
          <div
            v-if="showNotificationDropdown"
            class="absolute right-0 mt-2 w-60 bg-white border border-red-300 rounded-lg shadow-lg z-50"
          >
            <div class="px-4 py-2 text-red-700">
              You have {{ notifications.length }} new notifications
            </div>
            <a
              v-for="notification in notifications"
              :key="notification.id"
              href="#"
              class="block px-4 py-2 text-red-700 hover:bg-red-100"
            >
              {{ notification.content }}
            </a>
          </div>
        </div>

        <!-- Message Icon -->
        <div class="relative">
          <i
            @click="toggleMessageDropdown"
            class="fa-solid fa-envelope text-2xl text-red-500 hover:text-red-600 cursor-pointer transition duration-300"
          ></i>
          <div
            v-if="showMessageDropdown"
            class="absolute right-0 mt-2 w-60 bg-white border border-red-300 rounded-lg shadow-lg z-50"
          >
            <div class="px-4 py-2 text-red-700">You have 2 new messages</div>
            <a href="#" class="block px-4 py-2 text-red-700 hover:bg-red-100">Message 1</a>
            <a href="#" class="block px-4 py-2 text-red-700 hover:bg-red-100">Message 2</a>
          </div>
        </div>

        <!-- Profile Icon -->
        <div class="relative">
          <i
            @click="toggleDropdown"
            class="fa-solid fa-user text-2xl text-red-500 hover:text-red-600 cursor-pointer transition duration-300"
          ></i>
          <div
            v-if="showDropdown"
            class="absolute right-0 mt-2 w-48 bg-white border border-red-300 rounded-lg shadow-lg z-50"
          >
            <router-link
              to="/profile"
              class="block px-4 py-2 text-red-700 hover:bg-red-100"
            >
              Profile
            </router-link>
            <router-link
              :to="{ path: '/userBooking', query: { userId: userId } }"
              class="block px-4 py-2 text-red-700 hover:bg-red-100"
            >
              My Bookings
            </router-link>
            <router-link
              to="/userPayments"
              class="block px-4 py-2 text-red-700 hover:bg-red-100"
            >
              Track Payments
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
  </header>
</template>

<script>
import axios from 'axios';

export default {
  name: 'userHeader',
  data() {
    return {
      showDropdown: false,
      showNotificationDropdown: false,
      showMessageDropdown: false,
      notifications: [], // Array to store notifications
      userId: null, // Store userId
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    toggleNotificationDropdown() {
      this.showNotificationDropdown = !this.showNotificationDropdown;
      this.showMessageDropdown = false;
    },
    toggleMessageDropdown() {
      this.showMessageDropdown = !this.showMessageDropdown;
      this.showNotificationDropdown = false;
    },
    async fetchNotifications() {
      try {
        const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
        if (!userId) {
          throw new Error('User ID is not available');
        }
        const response = await axios.get(`/api/notifications?userId=${userId}`);
        this.notifications = response.data;
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
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
          console.error('Logout failed:', await response.json());
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
  },
  mounted() {
    this.userId = localStorage.getItem('userId'); // Set userId when component is mounted
    this.fetchNotifications(); // Fetch notifications when the component is mounted
  },
};
</script>

<style scoped>
/* Map container z-index set lower than dropdown */
.map-container {
  z-index: 10;
}
</style>