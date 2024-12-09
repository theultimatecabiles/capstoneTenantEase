<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <adminHeader class="w-full" />

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <AdminSidebar @navChange="handleNavChange" class="w-64 flex-shrink-0" />

      <!-- Main Content -->
      <div class="flex-1 p-6 overflow-auto">
        <h1 class="text-2xl font-bold mb-6">{{ currentView }}</h1>

        <!-- Users View -->
        <div v-if="currentView === 'Users'" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Users Management</h2>
          <div class="filter-buttons flex justify-between items-center my-8">
            <div class="flex space-x-4">
              <button
                v-for="filter in ['all', 'verified', 'notVerified']"
                :key="filter"
                @click="filterUsers(filter)"
                :class="activeFilter === filter ? activeButtonClasses : buttonClasses"
                class="px-4 py-2 rounded-md text-sm font-medium shadow-md"
              >
                {{ filter === 'all' ? 'All Users' : `${filter.charAt(0).toUpperCase()}${filter.slice(1)} Users` }}
              </button>
            </div>
            <div class="w-48">
              <label for="roleFilter" class="block text-sm font-medium text-gray-700">
                Filter by Role:
              </label>
              <select
                id="roleFilter"
                v-model="selectedRole"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              >
                <option value="">All Roles</option>
                <option value="renter">Renter</option>
                <option value="host">Host</option>
              </select>
            </div>
          </div>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profile</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Joined</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.userId">
                <td class="px-6 py-4 whitespace-nowrap">
                  <img
                    :src="user.profilePic || '/default-profile.png'"
                    alt="Profile"
                    class="w-20 h-20 rounded-full object-cover"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ user.role.roleName }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(user.dateJoined) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="user.verified ? 'text-green-600' : 'text-red-600'">
                    {{ user.verified ? 'Verified' : 'Not Verified' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button
                    v-if="user.document"
                    @click="viewDocument(user.document)"
                    class="text-red-600 hover:text-red-800"
                  >
                    View Document
                  </button>
                  <span v-else class="text-gray-400">No Document</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Listings View -->
        <div v-else-if="currentView === 'Listings'" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Listings Management</h2>

          <div v-if="loading" class="text-center text-gray-600">Loading listings...</div>
          <div v-if="error" class="text-center text-red-600">{{ error }}</div>

          <div v-if="!loading && !error && filteredListings.length === 0" class="text-center text-gray-600">
            No listings found for the selected filter.
          </div>

          <div class="flex space-x-4 mb-6">
          <button
            v-for="filter in ['pending', 'approved', 'rejected']"
            :key="filter"
            @click="filterListings(filter)"
            :class="[
              listingactiveFilter === filter ? activeButtonClasses : buttonClasses,
              'px-4 py-2 rounded-md text-sm font-medium shadow-md transition duration-300 ease-in-out'
            ]"
          >
            {{ filter.charAt(0).toUpperCase() + filter.slice(1) }}
          </button>
        </div>

        <div v-for="(item, index) in filteredListings" :key="index" class="listing-container mb-6 mx-auto max-w-4xl">
    <div 
      class="listing-card p-6 bg-white shadow-md rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300"
      @click="viewListingDetails(item.listingId)"
    >
          <!-- Status Badge -->
          <div class="mb-4">
            <span :class="getStatusClass(item.status)" class="px-2 py-1 rounded-full text-sm font-semibold">
              {{ item.status }}
            </span>
          </div>
              
              <!-- Listing Information -->
              <div class="mb-4">
                <h3 class="text-lg font-medium text-gray-800 mb-2">Listing Information</h3>
                <div class="flex space-x-6">
                  <div class="w-1/3">
                    <img
                      :src="item.images[0]?.imageUrl"
                      alt="Listing Image"
                      class="w-full h-40 object-cover rounded-md"
                    />
                  </div>
                  <div class="w-2/3">
                    <h2 class="text-xl font-semibold mb-2">{{ item.title }}</h2>
                    <p class="text-gray-600 mb-1">{{ item.description }}</p>
                    <p class="text-gray-800"><strong>Address:</strong> {{ item.address }}</p>
                    <p class="text-gray-800"><strong>Price:</strong> ₱{{ item.price.toFixed(2) }}</p>
                  </div>
                </div>
              </div>

              <!-- Host Information -->
              <div class="mb-4">
                <h3 class="text-lg font-medium text-gray-800 mb-2">Host Information</h3>
                <div class="flex items-center space-x-4">
                  <div v-if="item.user.profilePic" class="w-1/3">
                    <img
                      :src="item.user.profilePic"
                      alt="Profile Picture"
                      class="w-40 h-40 object-cover rounded-full border-2 border-gray-300 shadow-sm"
                    />
                  </div>
                  <div class="w-2/3">
                    <p class="text-gray-800"><strong>Name:</strong> {{ item.user.name }}</p>
                    <p class="text-gray-800"><strong>Email:</strong> {{ item.user.email }}</p>
                    <p v-if="item.user.phone" class="text-gray-800">
                      <strong>Phone:</strong> {{ item.user.phone }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Admin Actions -->
              <div v-if="item.status === 'PENDING'" class="mt-4 flex justify-end space-x-4">
                <button 
                  @click="approveListing(item)" 
                  class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Approve
                </button>
                <button 
                  @click="updateListingStatus(item, 'rejected')" 
                  class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Document Modal -->
        <div
          v-if="showDocumentModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div class="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-semibold text-gray-900">Document Image</h2>
              <button @click="closeDocumentModal" class="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <img :src="currentDocument" alt="Document" class="w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import adminHeader from "~/components/adminHeader.vue";
import AdminSidebar from "~/components/adminSideBar.vue";
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    adminHeader,
    AdminSidebar,
  },
  setup() {
    const currentView = ref('Users');
    const allUsers = ref([]);
    const activeFilter = ref('all');
    const showDocumentModal = ref(false);
    const currentDocument = ref('');
    const selectedRole = ref('');
    const loading = ref(false);
    const error = ref(null);
    const listingactiveFilter = ref('pending'); // Set default filter to 'pending'
    const listings = ref([]);
    const router = useRouter();

    const buttonClasses = "bg-white text-red-600 border border-red-600";
    const activeButtonClasses = "bg-red-600 text-white";

    const handleNavChange = (view) => {
      currentView.value = view;
    };

    const viewListingDetails = (listingId) => {
      router.push({ name: 'adminListingView', query: { listingId: listingId } });
    };

    const fetchListings = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await axios.get('/api/admin/listingsAdmin');
        listings.value = response.data;
      } catch (err) {
        console.error('Error fetching listings:', err);
        error.value = 'Failed to fetch listings. Please try again.';
      } finally {
        loading.value = false;
      }
    };

    const approveListing = async (listing) => {
      try {
        event.stopPropagation();
        const response = await axios.post(`/api/admin/approveListing/${listing.listingId}`);
        if (response.data.message === 'Listing approved successfully') {
          toast.success('Listing approved successfully!', {
            autoClose: 3000,
            position: 'top-right',
          });
          window.location.reload();
          await fetchListings(); // Refresh the listings
        } else {
          throw new Error('Unexpected response from server');
        }
      } catch (error) {
        console.error('Error approving listing:', error);
        toast.error('Error approving listing. Please try again.', {
          autoClose: 3000,
          position: 'top-right',
        });
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        allUsers.value = response.data.filter(user => user.role.roleName !== 'admin');
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    const getStatusClass = (status) => {
      switch (status) {
        case 'PENDING':
          return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
        case 'APPROVED':
          return 'bg-green-100 text-green-800 border border-green-300';
        case 'REJECTED':
          return 'bg-red-100 text-red-800 border border-red-300';
        default:
          return 'bg-gray-100 text-gray-800 border border-gray-300';
      }
    };

    const filterUsers = (filter) => {
      activeFilter.value = filter;
    };

    const users = computed(() => {
      let filteredUsers = allUsers.value;

      if (selectedRole.value) {
        filteredUsers = filteredUsers.filter(user => user.role.roleName.toLowerCase() === selectedRole.value);
      }

      if (activeFilter.value === 'verified') {
        filteredUsers = filteredUsers.filter(user => user.verified);
      } else if (activeFilter.value === 'notVerified') {
        filteredUsers = filteredUsers.filter(user => !user.verified);
      }

      return filteredUsers;
    });

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const viewDocument = (documentUrl) => {
      if (documentUrl) {
        currentDocument.value = documentUrl;
        showDocumentModal.value = true;
      }
    };

    const closeDocumentModal = () => {
      showDocumentModal.value = false;
      currentDocument.value = '';
    };

    const filterListings = (filter) => {
      listingactiveFilter.value = filter;
    };

    const filteredListings = computed(() => {
      if (listingactiveFilter.value === 'pending') {
        return listings.value.filter(listing => listing.status === 'PENDING');
      } else if (listingactiveFilter.value === 'approved') {
        return listings.value.filter(listing => listing.status === 'APPROVED');
      } else if (listingactiveFilter.value === 'rejected') {
        return listings.value.filter(listing => listing.status === 'REJECTED');
      }
      return listings.value;
    });

    onMounted(() => {
      fetchUsers();
      if (currentView.value === 'Listings') {
        fetchListings();
      }
    });

    watch(currentView, (newView) => {
      if (newView === 'Listings') {
        fetchListings();
      }
    });

    return {
      currentView,
      users,
      activeFilter,
      showDocumentModal,
      currentDocument,
      selectedRole,
      buttonClasses,
      activeButtonClasses,
      handleNavChange,
      filterUsers,
      formatDate,
      viewDocument,
      closeDocumentModal,
      listings,
      approveListing,
      filterListings,
      filteredListings,
      getStatusClass,
      loading,
      error,
      viewListingDetails,
    };
  },
};
</script>