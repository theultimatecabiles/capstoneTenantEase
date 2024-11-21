<template>
    <div class="page-wrapper bg-gray-50 min-h-screen">
      <!-- dashHeader component -->
      <userHeader />
  
      <!-- Page Header Section -->
      <div class="page-header bg-gradient-to-r from-red-400 to-red-800 text-white py-6 px-8">
        <h1 class="text-3xl font-bold">Track Payments</h1>
        <p class="text-lg">View and manage payments from your bookers.</p>
      </div>
  
      <!-- Payment Details -->
      <div v-if="loading" class="text-center text-gray-600">Loading payments...</div>
      <div v-if="error" class="text-center text-red-600">{{ error }}</div>
  
      <div v-if="!loading && !error && payments.length === 0" class="text-center text-gray-600">
        No payments found.
      </div>
  
      <div v-for="(payment, index) in payments" :key="index" class="payment-container mt-6 mb-6 mx-auto max-w-4xl">
        <div class="payment-card relative p-6 bg-white shadow-md rounded-lg border-l-4" 
             :class="payment.status.statusName === 'Paid' ? 'border-green-500' : 'border-red-500'">
          <!-- Timeline Indicator -->
          <div class="absolute -left-8 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-2 rounded-full flex items-center justify-center"
               :class="payment.status.statusName === 'Paid' ? 'border-green-500' : 'border-red-500'">
            <span :class="payment.status.statusName === 'Paid' ? 'text-green-500' : 'text-red-500'">●</span>
          </div>
  
          <!-- Payment Information -->
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-800">Payment #{{ index + 1 }}</h3>
            <span class="text-sm text-gray-500">{{ new Date(payment.paymentDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) }}</span>
          </div>
  
          <div class="flex flex-col gap-2">
            <p><strong>Paid Amount:</strong> <span class="payment-amount text-gray-700">₱{{ payment.amount.toFixed(2) }}</span></p>
            <p><strong>Status:   </strong> 
              <span class="payment-status text-sm px-2 py-1 rounded-full" 
                    :class="payment.status.statusName === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'">
                {{ payment.status.statusName }}
              </span>
            </p>
            <!-- Host and Listing Information -->
            <p><strong>Received by:</strong> <span class="text-gray-700">{{ payment.booking.listing.user.name || 'Unknown Host' }}</span></p>
            <p><strong>Listing:</strong> <span class="text-gray-700">{{ payment.booking.listing.title || 'Unknown Listing' }}</span></p>
            <p><strong>Address:</strong> <span class="text-gray-700">{{ payment.booking.listing.address || 'Unknown Listing' }}</span></p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  export default {
    setup() {
      const payments = ref([]);
      const loading = ref(true);
      const error = ref(null);
  
      onMounted(() => {
        fetchPayments();
      });
  
      const fetchPayments = async () => {
        try {
          loading.value = true;
          const userId = localStorage.getItem("userId");
          if (!userId) {
            error.value = "User is not logged in.";
            return;
          }
  
          const response = await axios.get(`/api/getPayments?userId=${userId}&type=user`);
          if (response.data.success) {
            payments.value = response.data.payments;
          } else {
            error.value = response.data.message || "Failed to fetch payments.";
          }
        } catch (err) {
          console.error(err);
          error.value = "An error occurred while fetching payments.";
        } finally {
          loading.value = false;
        }
      };
  
      return {
        payments,
        loading,
        error,
      };
    },
  };
  </script>