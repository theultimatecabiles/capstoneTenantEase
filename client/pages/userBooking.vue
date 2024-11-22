<template>
  <div class="page-wrapper bg-gray-50 min-h-screen">
    <UserHeader />
    <!-- Page Header Section -->
    <div class="page-header bg-gradient-to-r from-red-400 to-red-800 text-white py-6 px-8">
      <h1 class="text-3xl font-bold">Your Bookings</h1>
      <p class="text-lg">Review the details of your bookings below.</p>
    </div>

    <!-- Booking Details -->
    <div v-if="loading" class="text-center text-gray-600 py-10">Loading your bookings...</div>
    <div v-if="error" class="text-center text-red-600 py-10">{{ error }}</div>

    <div v-if="!loading && !error && bookings.length === 0" class="text-center text-gray-600 py-10">
      No bookings found.
    </div>

    <div v-for="(booking, index) in bookings" :key="index" class="booking-container mt-6 mb-6 mx-auto max-w-4xl">
      <div class="booking-card p-6 bg-white shadow-md rounded-lg relative">
        <!-- Listing Information -->
        <div class="mb-4">
          <div class="flex justify-between items-start">
            <!-- Listing Image -->
            <div class="w-1/3 mr-4">
              <img
                v-if="booking.listing.images && booking.listing.images.length > 0"
                :src="booking.listing.images[0].imageUrl"
                alt="Listing Image"
                class="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <!-- Listing Details -->
            <div class="text-left w-2/3">
              <h2 class="text-xl font-semibold mb-2">{{ booking.listing.title }}</h2>
              <p class="text-gray-600 mb-1">{{ booking.listing.description }}</p>
              <p class="text-gray-800"><strong>Address:</strong> {{ booking.listing.address }}</p>
              <p class="text-gray-800"><strong>Price:</strong> ₱{{ booking.listing.price.toFixed(2) }}</p>
              <div v-if="booking.latestPayment" class="text-gray-800 mt-2">
                <div class="payment-info">
                  <p><strong>Next Payment Deadline: </strong> 
                    <span class="payment-date">{{ new Date(booking.latestPayment.nextPaymentDue).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
                  </p>
                </div>
              </div>
            </div>
            <!-- Status -->
            <div class="ml-auto text-right">
              <p class="text-gray-800 font-semibold bg-gray-200 px-3 py-1 rounded-full">
                {{ booking.status.statusName }}
              </p>
            </div>
          </div>
        </div>

        <!-- Proceed to Payment Button -->
        <div class="text-right mt-4">
          <button
            v-if="booking.status.statusName === 'Booked' || booking.status.statusName === 'Payment Due'"
            @click="openPaymentModal(booking)"
            class="bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>

    <!-- PayPal Modal -->
    <PaypalModal
      :isOpen="isPaymentModalOpen"
      :amount="paymentAmount"
      :bookingId="selectedBookingId"
      :paymentMethodId="selectedPaymentMethodId"
      :statusId="selectedStatusId"
      :hostId="selectedHostId"
      :bookerId="selectedBookerId"
      :listingId="selectedListingId"
      @close="isPaymentModalOpen = false"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import UserHeader from "~/components/userHeader.vue";
import PaypalModal from "~/components/PaypalModal.vue";
import axios from "axios";

export default {
  components: {
    UserHeader,
    PaypalModal,
  },
  setup() {
    const bookings = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const isPaymentModalOpen = ref(false);
    const paymentAmount = ref(0);
    const selectedBookingId = ref(null);
    const selectedPaymentMethodId = ref(1); // Assuming 1 is the default payment method ID
    const selectedStatusId = ref(2); // Assuming 2 is the status ID for payment
    const selectedHostId = ref(null);
    const selectedBookerId = ref(null);
    const selectedListingId = ref(null);

    const openPaymentModal = (booking) => {
      paymentAmount.value = booking.listing.price;
      selectedBookingId.value = booking.bookingId;
      selectedHostId.value = booking.listing.hostId;
      selectedBookerId.value = booking.bookerId;
      selectedListingId.value = booking.listing.listingId;
      isPaymentModalOpen.value = true;
    };

    const fetchBookings = async () => {
      try {
        loading.value = true;
        const userId = localStorage.getItem("userId");
        if (!userId) {
          error.value = "User is not logged in.";
          return;
        }

        const response = await fetch(`/api/getUserBooking?userId=${userId}`);
        const data = await response.json();

        if (response.ok) {
          bookings.value = await Promise.all(data.bookings.map(async (booking) => {
            const paymentResponse = await fetch(`/api/getPaymentByBookingId?bookingId=${booking.bookingId}`);
            const paymentData = await paymentResponse.json();
            if (paymentData.success) {
              booking.latestPayment = paymentData.latestPayment;
              const today = new Date();
              const nextPaymentDue = new Date(booking.latestPayment.nextPaymentDue);
              const timeDiff = nextPaymentDue - today;
              const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
              if (daysDiff <= 7) {
                booking.status.statusName = "Payment Due";

                // Ensure hostId, userId, and listingId are correctly defined
                const hostId = booking.listing.hostId;
                const listingId = booking.listing.listingId;

                try {
                  const notificationResponse = await axios.post('/api/notification', {
                    hostId: parseInt(hostId, 10),
                    bookerId: parseInt(userId, 10),
                    listingId: parseInt(listingId, 10),
                    content: 'Your Payment is due in 7 days. Please make a payment.',
                    type: 'PaymentDue'
                  });

                  if (notificationResponse.status === 200) {
                    console.log("Payment due notification sent successfully.");
                  }
                } catch (error) {
                  console.error('Error sending payment due notification:', error);
                }
              }
            }
            return booking;
          }));
        } else {
          error.value = data.message || "Failed to fetch bookings.";
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
        error.value = "An error occurred while fetching bookings.";
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchBookings();
    });

    return {
      bookings,
      loading,
      error,
      isPaymentModalOpen,
      paymentAmount,
      selectedBookingId,
      selectedPaymentMethodId,
      selectedStatusId,
      selectedHostId,
      selectedBookerId,
      selectedListingId,
      openPaymentModal,
    };
  },
};
</script>