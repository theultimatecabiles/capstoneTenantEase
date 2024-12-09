<template>
    <div v-if="show" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg">
        <!-- Header -->
        <div class="border-b px-6 py-4 flex justify-between items-center">
          <h2 class="text-lg font-semibold">Terms and Conditions</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <!-- Content -->
        <div class="px-6 py-4 text-sm text-gray-600">
          <p class="mb-4">For your first booking:</p>
          <ul class="list-disc pl-6 mb-4">
            <li>The first payment will be double the monthly price.</li>
            <li>This includes the first month's rent and a one-month advance deposit.</li>
            <li>The deposit is refundable according to the refund policy.</li>
            <li>By proceeding, you agree to these terms and conditions.</li>
          </ul>
          <p class="text-red-500">Note: This is mandatory for all first-time bookings.</p>
        </div>
        <!-- Footer -->
        <div class="border-t px-6 py-4 flex justify-end">
          <button
            @click="acceptTerms"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Accept
          </button>
          <button
            @click="closeModal"
            class="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: true,
      },
    },
    emits: ['close', 'accept'],
    methods: {
      closeModal() {
        this.$emit('close');
      },
      acceptTerms() {
        this.$emit('accept');
      },
    },
  };
  </script>
  
  <style scoped>
  </style>