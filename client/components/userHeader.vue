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
            <div class="px-4 py-2 text-red-700">You have 3 new notifications</div>
            <a href="#" class="block px-4 py-2 text-red-700 hover:bg-red-100">Notification 1</a>
            <a href="#" class="block px-4 py-2 text-red-700 hover:bg-red-100">Notification 2</a>
            <a href="#" class="block px-4 py-2 text-red-700 hover:bg-red-100">Notification 3</a>
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
              to="/bookings"
              class="block px-4 py-2 text-red-700 hover:bg-red-100"
            >
              My Bookings
            </router-link>
            <router-link
              to="/favorites"
              class="block px-4 py-2 text-red-700 hover:bg-red-100"
            >
              Favorites
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
export default {
  name: 'userHeader',
  data() {
    return {
      showDropdown: false,
      showNotificationDropdown: false,
      showMessageDropdown: false,
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
};
</script>

<style scoped>
/* Map container z-index set lower than dropdown */
.map-container {
  z-index: 10;
}
</style>
