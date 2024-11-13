<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white shadow-lg rounded-lg p-10 max-w-lg text-center space-y-6">
      <h1 class="text-4xl font-bold text-red-600">Verify Your Email</h1>
      <p v-if="message" class="text-lg text-gray-700">{{ message }}</p>
      <p v-else class="text-lg text-gray-600">
        To complete your registration, please confirm your email address. This step helps us ensure the security and accuracy of our platform.
      </p>
      <div v-if="!message" class="flex items-center justify-center mt-4">
        <svg class="animate-spin h-10 w-10 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      </div>
      <p v-if="!message" class="text-sm text-gray-500 mt-6">
        Verifying your email, this may take a few seconds. Please do not close this page.
      </p>
      <button 
        v-if="message" 
        @click="navigateToHome" 
        class="mt-8 w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-lg text-lg hover:bg-red-700 transition duration-300"
      >
        Go to Home
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const message = ref('');

onMounted(async () => {
  const token = route.query.token;

  if (!token) {
    message.value = 'Verification token missing.';
    return;
  }

  try {
    const response = await fetch(`/api/verifyEmail?token=${token}`, {
      method: 'GET',
    });
    const result = await response.json();
    message.value = result.message;

    // Redirect after a delay, if needed
    setTimeout(() => router.push('/'), 3000); // Redirect to home page
  } catch (error) {
    message.value = 'An error occurred during verification.';
  }
});

function navigateToHome() {
  router.push('/');
}
</script>

<style scoped>
.min-h-screen {
  background-color: #f9fafb;
}

.text-red-600 {
  color: #e3342f;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.5rem;
}

.hover\:bg-red-700:hover {
  background-color: #cc1f1a;
}

.text-center {
  text-align: center;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
