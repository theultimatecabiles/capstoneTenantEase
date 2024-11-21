<template>
  <div class="page-wrapper bg-gray-50 min-h-screen">
    <!-- dashHeader component -->
    <dashHeader />

    <!-- Page Header Section -->
    <div class="page-header bg-gradient-to-r from-red-400 to-red-800 text-white py-6 px-8">
      <h1 class="text-3xl font-bold">Manage Your Bookings</h1>
      <p class="text-lg">View and manage your apartment bookings with ease.</p>
    </div>

    <!-- Filter Buttons -->
    <div class="filter-buttons flex justify-center space-x-4 my-8">
      <button
        @click="viewByHost"
        :class="activeTab === 'host' ? activeButtonClasses : buttonClasses"
        class="px-4 py-2 rounded-md text-sm font-medium shadow-md"
      >
        Pending Bookings
      </button>
      <button
        @click="viewActiveBookings"
        :class="activeTab === 'activeBooking' ? activeButtonClasses : buttonClasses"
        class="px-4 py-2 rounded-md text-sm font-medium shadow-md"
      >
        Active Bookings
      </button>
      <button
        @click="viewActiveListings"
        :class="activeTab === 'active' ? activeButtonClasses : buttonClasses"
        class="px-4 py-2 rounded-md text-sm font-medium shadow-md"
      >
        Active Listings
      </button>
      <button
        @click="viewBookingHistory"
        :class="activeTab === 'history' ? activeButtonClasses : buttonClasses"
        class="px-4 py-2 rounded-md text-sm font-medium shadow-md"
      >
        Booking History
      </button>
    </div>

    <!-- Booking Details -->
    <div v-if="loading" class="text-center text-gray-600">Loading your bookings...</div>
    <div v-if="error" class="text-center text-red-600">{{ error }}</div>

    <div v-if="!loading && !error && bookings.length === 0" class="text-center text-gray-600">
      No bookings found for the selected category.
    </div>

    <div v-for="(item, index) in bookings" :key="index" class="booking-container mb-6 mx-auto max-w-4xl">
      <div class="booking-card p-6 bg-white shadow-md rounded-lg">

        <!-- Listing Information -->
        <div class="mb-4">
          <div class="flex justify-center items-center">
            <p v-if="activeTab === 'host'" class="text-gray-800 font-semibold center">
              Status: User is waiting for the approval of the booking.
            </p>
            <p v-else-if="activeTab === 'activeBooking' && item.payment && item.payment.paymentId" class="text-gray-800 font-semibold">
              Status: User has paid the booking.
            </p>
            <p v-else-if="activeTab === 'activeBooking'" class="text-gray-800 font-semibold">
              Status: Waiting for payment from the booker.
            </p>
          </div>
          <h3 class="text-lg font-medium text-gray-800 mb-2">Listing Information</h3>
          <div class="flex space-x-6">
            <div class="w-1/3">
              <img
                :src="item.listing.images[0]?.imageUrl"
                alt="Listing Image"
                class="w-full h-40 object-cover rounded-md"
              />
            </div>
            <div class="w-2/3">
              <h2 class="text-xl font-semibold mb-2">{{ item.listing.title }}</h2>
              <p class="text-gray-600 mb-1">{{ item.listing.description }}</p>
              <p class="text-gray-800"><strong>Address:</strong> {{ item.listing.address }}</p>
              <p class="text-gray-800"><strong>Price:</strong> ₱{{ item.listing.price.toFixed(2) }}</p>
            </div>
          </div>
        </div>

        <!-- Booker Information -->
        <div class="mb-4">
          <h3 class="text-lg font-medium text-gray-800 mb-2">Booker Information</h3>
          <div class="flex items-center space-x-4">
            <div v-if="item.booker.profilePic" class="w-1/3">
              <img
                :src="item.booker.profilePic"
                alt="Profile Picture"
                class="w-40 h-40 object-cover rounded-full border-2 border-gray-300 shadow-sm"
              />
            </div>
            <div class="w-2/3">
              <p class="text-gray-800"><strong>Name:</strong> {{ item.booker.name }}</p>
              <p class="text-gray-800"><strong>Email:</strong> {{ item.booker.email }}</p>
              <p v-if="item.booker.phone" class="text-gray-800">
                <strong>Phone:</strong> {{ item.booker.phone }}
              </p>
              <div v-if="item.booker.document" class="mt-4">
                <p><strong>Booker Document:</strong></p>
                <button @click="toggleDocumentModal(item.booker.document)" class="text-blue-600 hover:underline font-medium">
                  View Document
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Information -->
        <div v-if="item.payment && item.payment.nextPaymentDue" class="mb-4">
          <h3 class="text-lg font-medium text-gray-800 mb-2">Payment Information</h3>
          <p><strong>Next Payment Deadline: </strong> 
            <span class="payment-date">{{ new Date(item.payment.nextPaymentDue).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
          </p>
        </div>

        <!-- Booking Status and Actions -->
        <div class="flex justify-between mt-4">
          <div v-if="activeTab === 'host'" class="flex justify-between w-full">
            <!-- Reject Button on the Left -->
            <div class="flex justify-start w-1/3">
              <button
                @click="rejectBooking(item)"
                class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Reject
              </button>
            </div>

            <!-- Approve Button on the Right -->
            <div class="flex justify-end w-1/3">
              <button
                @click="approveBooking(item)"
                class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Document Modal -->
    <div v-if="showDocumentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full transition-all transform scale-100 duration-300 ease-in-out">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold text-gray-900">Document Image</h2>
          <button @click="toggleDocumentModal(null)" class="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <img :src="documentImage" alt="Document Image" class="w-full h-auto rounded mb-4 shadow-sm" />
        <div class="flex justify-start">
          <button @click="toggleDocumentModal(null)" class="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 focus:outline-none transition duration-200">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios"; // Import axios for making HTTP requests

export default {
  setup() {
    const bookings = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const activeTab = ref("host");
    const showDocumentModal = ref(false);
    const documentImage = ref(null);

    onMounted(() => {
      fetchBookings("host");
    });

    const fetchBookings = async (type) => {
      try {
        loading.value = true;
        const userId = localStorage.getItem("userId");
        if (!userId) {
          error.value = "User is not logged in.";
          return;
        }

        let response;
        if (type === "host") {
          response = await fetch(`/api/getHostBooking?userId=${userId}`);
        } else if (type === "activeBooking") {
          response = await fetch(`/api/getActiveBookings?userId=${userId}`);
        } else if (type === "active") {
          response = await fetch(`/api/getActiveListings?userId=${userId}`);
        } else if (type === "history") {
          response = await fetch(`/api/getBookingHistory?userId=${userId}`);
        }

        const data = await response.json();

        if (response.ok) {
          bookings.value = await Promise.all(
            data.bookings.map(async (booking) => {
              const paymentResponse = await axios.get(`/api/getPaymentByBookingId?bookingId=${booking.bookingId}`);
              if (paymentResponse.data.success) {
                booking.payment = paymentResponse.data.latestPayment;
              }
              return booking;
            })
          );
        } else {
          error.value = data.message || "Failed to fetch bookings.";
        }
      } catch (err) {
        console.error(err);
        error.value = "An error occurred while fetching bookings.";
      } finally {
        loading.value = false;
      }
    };

    const viewByHost = () => {
      activeTab.value = "host";
      fetchBookings("host");
    };

    const viewActiveBookings = () => {
      activeTab.value = "activeBooking";
      fetchBookings("activeBooking");
    };

    const viewActiveListings = () => {
      activeTab.value = "active";
      fetchBookings("active");
    };

    const viewBookingHistory = () => {
      activeTab.value = "history";
      fetchBookings("history");
    };

    const toggleDocumentModal = (documentUrl) => {
      documentImage.value = documentUrl;
      showDocumentModal.value = !showDocumentModal.value;
    };

    const approveBooking = async (item) => {
      try {
        const response = await axios.post('/api/booking/approve', { bookingId: item.bookingId });
        if (response.data.success) {
          alert('Booking approved successfully.');
          fetchBookings(activeTab.value); // Refresh the bookings list
        } else {
          alert('Failed to approve booking.');
        }
      } catch (error) {
        console.error('Error approving booking:', error);
        alert('An error occurred while approving the booking.');
      }
    };

    const buttonClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300";
    const activeButtonClasses = "bg-red-600 text-white hover:bg-red-700";

    return {
      bookings,
      loading,
      error,
      activeTab,
      viewByHost,
      viewActiveBookings,
      viewActiveListings,
      viewBookingHistory,
      toggleDocumentModal,
      showDocumentModal,
      documentImage,
      buttonClasses,
      activeButtonClasses,
      approveBooking,
    };
  },
};
</script>