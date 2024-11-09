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
            <div class="px-4 py-2 text-red-700">You have 3 new notifications</div>
            <a href="#" class="block px-4 py-2 text-red-700 hover:bg-red-100">Notification 1</a>
            <a href="#" class="block px-4 py-2 text-red-700 hover:bg-red-100">Notification 2</a>
            <a href="#" class="block px-4 py-2 text-red-700 hover:bg-red-100">Notification 3</a>
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
  </header>
</template>

<script>
import AddListingModal from '@/components/AddListingModal.vue';

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
    };
  },
  methods: {
  async toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  },
  toggleAddListingModal() {
    this.showAddListingModal = !this.showAddListingModal;
  },
  toggleNotificationDropdown() {
    this.showNotificationDropdown = !this.showNotificationDropdown;
    this.showMessageDropdown = false; // Close message dropdown if open
  },
  toggleMessageDropdown() {
    this.showMessageDropdown = !this.showMessageDropdown;
    this.showNotificationDropdown = false; // Close notification dropdown if open
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
        // Remove token and userId from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        
        // Redirect to the login page
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
/* DashHeader */
.dashHeader {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 9999; /* Ensures header is always on top */
  background-color: white;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

/* Notification dropdown */
.notification-dropdown,
.message-dropdown,
.profile-dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  width: 220px;
  background-color: white;
  border: 1px solid #e5e7eb; /* Light border */
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10000; /* Ensure it's above other content */
}

/* Specific styling for dropdowns */
.notification-dropdown {
  z-index: 10001;
}

.message-dropdown {
  z-index: 10002;
}

.profile-dropdown {
  z-index: 10003;
}

/* Styling for each dropdown item */
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
