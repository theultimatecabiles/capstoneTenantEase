<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center overflow-y-auto">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
      <h2 class="text-xl font-semibold mb-4">Pay with PayPal</h2>
      <!-- Scrollable Content -->
      <div class="max-h-[75vh] overflow-y-auto">
        <div id="paypal-button-container"></div>
      </div>
      <!-- Cancel Button -->
      <button class="mt-4 px-4 py-2 bg-red-500 text-white rounded" @click="$emit('close')">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import { loadScript } from "@paypal/paypal-js";
import axios from "axios";

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    bookingId: {
      type: Number,
      required: true,
    },
    paymentMethodId: {
      type: Number,
      required: true,
    },
    statusId: {
      type: Number,
      required: true,
    },
    hostId: {
      type: Number,
      required: true,
    },
    bookerId: {
      type: Number,
      required: true,
    },
    listingId: {
      type: Number,
      required: true,
    },
    nextPaymentDue: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      localIsFirstPayment: true,
      latestPaymentDue: null,
    };
  },
  watch: {
    isOpen(newValue) {
      if (newValue) {
        this.checkFirstPayment();
      }
    },
  },
  methods: {
    async checkFirstPayment() {
      try {
        const response = await axios.get('/api/checkFirstPayment', {
          params: { bookingId: this.bookingId },
        });
        this.localIsFirstPayment = response.data.isFirstPayment;
        await this.fetchLatestPaymentDue();
        this.initializePayPal();
      } catch (error) {
        console.error('Error checking first payment:', error);
      }
    },
    async fetchLatestPaymentDue() {
      try {
        const response = await axios.get('/api/getPaymentByBookingId', {
          params: { bookingId: this.bookingId },
        });
        this.latestPaymentDue = response.data.latestPayment.nextPaymentDue;
      } catch (error) {
        console.error('Error fetching latest payment due:', error);
      }
    },
    async initializePayPal() {
      const paypal = await loadScript({
        "client-id": "Af1rWUaL3SKH5-YEJKq7VlcmYXjFlAGSFs9ysf9ByAQHCk8Id6VQxbRfx1ohkxOkJe1cyOLoOimq7zZh", // Replace with your PayPal Sandbox Client ID
        currency: "PHP",
      });

      if (!paypal) {
        console.error("Failed to load PayPal SDK");
        return;
      }

      paypal.Buttons({
        createOrder: (data, actions) => {
          const paymentAmount = this.localIsFirstPayment ? (this.amount * 2).toFixed(2) : this.amount.toFixed(2);
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: paymentAmount,
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(async (details) => {
            alert(`Transaction completed by ${details.payer.name.given_name}`);
            
            // Calculate the next payment due date
            let nextPaymentDue;
            if (this.localIsFirstPayment) {
              const paymentDate = new Date(details.create_time);
              nextPaymentDue = new Date(paymentDate);
              nextPaymentDue.setMonth(paymentDate.getMonth() + 2);
            } else {
              nextPaymentDue = new Date(this.latestPaymentDue || details.create_time);
              nextPaymentDue.setMonth(nextPaymentDue.getMonth() + 1);
            }

            // Send payment details to the server
            try {
              await axios.post('/api/processPayment', {
                bookingId: this.bookingId,
                amount: this.localIsFirstPayment ? this.amount * 2 : this.amount,
                paymentMethodId: this.paymentMethodId,
                statusId: this.statusId,
                hostId: this.hostId,
                bookerId: this.bookerId,
                listingId: this.listingId,
                nextPaymentDue: nextPaymentDue.toISOString().split('T')[0], // Format as YYYY-MM-DD
              });
              alert('Payment processed successfully.');

              // Emit the next payment due date
              this.$emit('paymentProcessed', nextPaymentDue.toISOString().split('T')[0]);

              // Set localIsFirstPayment to false after the first payment
              this.localIsFirstPayment = false;
            } catch (error) {
              console.error('Error processing payment:', error);
              alert('Failed to process payment.');
            }

            this.$emit("close");
          });
        },
        onError: (err) => {
          console.error("PayPal Checkout Error:", err);
          alert("Payment failed. Please try again.");
        },
      }).render("#paypal-button-container");
    },
  },
};
</script>

<style>
/* Optional: Smooth scrolling for long content */
.overflow-y-auto {
  scroll-behavior: smooth;
}
</style>