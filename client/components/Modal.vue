<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
      <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 class="text-3xl font-bold text-red-600 mb-8 text-center">{{ isLogin ? 'Login' : 'Register' }}</h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div v-if="isLogin">
          <!-- Login Fields -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="email" type="email" id="email" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" required />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input v-model="password" type="password" id="password" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" required />
          </div>
          <button type="button" @click="toggleForm" class="text-red-600 hover:underline">Switch to Register</button>
        </div>
        <div v-else>
          <!-- Registration Fields -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input v-model="name" type="text" id="name" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" required />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="email" type="email" id="email" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" required />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input v-model="password" type="password" id="password" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" required />
          </div>
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input v-model="confirmPassword" type="password" id="confirmPassword" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" required />
          </div>
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
            <input v-model="phone" type="tel" id="phone" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" />
          </div>
          <div>
            <label for="roleId" class="block text-sm font-medium text-gray-700">Role</label>
            <select v-model="roleId" id="roleId" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" required>
              <option value="1">User</option>
              <option value="2">Host</option>
            </select>
          </div>
          <div>
            <label for="profilePic" class="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input @change="handleFileChange" type="file" id="profilePic" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            <img v-if="profilePicUrl" :src="profilePicUrl" alt="Profile Preview" class="mt-4 w-24 h-24 object-cover rounded-full border border-gray-300" />
          </div>
          <button type="button" @click="toggleForm" class="text-red-600 hover:underline">Switch to Login</button>
        </div>
        <button type="submit" class="w-full bg-red-600 text-white rounded-full py-3 px-4 text-lg font-semibold hover:bg-red-700 transition duration-300">Submit</button>
      </form>
      <Toast v-if="showToast" :message="toastMessage" @close="showToast = false" />
    </div>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue';

export default {
  components: {
    Toast
  },
  data() {
    return {
      isLogin: true,  // Toggle between login and registration form
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      profilePic: null,
      profilePicUrl: '',
      roleId: '',
      showToast: false, // Controls visibility of the toast
      toastMessage: '', // Stores the message to display
      toastType: 'success' // Controls the toast type (success/error)
    };
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
      this.toastMessage = '';
      this.profilePic = null;
      this.profilePicUrl = '';
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.profilePic = file;
        this.profilePicUrl = URL.createObjectURL(file);
      }
    },
    async handleSubmit() {
      try {
        const formData = new FormData();
        formData.append('action', this.isLogin ? 'login' : 'register');
        formData.append('name', this.name);
        formData.append('email', this.email);
        formData.append('password', this.password);
        formData.append('confirmPassword', this.confirmPassword);
        formData.append('phone', this.phone);
        formData.append('roleId', this.roleId);
        if (this.profilePic) {
          formData.append('profilePic', this.profilePic);
        }

        const response = await fetch('/api/auth', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          if (this.isLogin) {
            // Handle successful login
            localStorage.setItem('token', result.token);
            localStorage.setItem('userId', result.userId);
            
            // Check user role and redirect accordingly
            if (result.roleId === 1) {
              // Redirect to User Dashboard
              this.toastMessage = 'Login successful! Redirecting to your dashboard...';
              this.toastType = 'success';
              this.showToast = true;
              setTimeout(() => {
                this.$router.push('/userDashboard');
                this.$emit('close');
              }, 2000);
            } else if (result.roleId === 2) {
              // Redirect to Host Dashboard
              this.toastMessage = 'Login successful! Redirecting to host dashboard...';
              this.toastType = 'success';
              this.showToast = true;
              setTimeout(() => {
                this.$router.push('/dashboard');
                this.$emit('close');
              }, 2000);
            }
          } else {
            // Handle successful registration
            this.toastMessage = 'Registration successful! Redirecting to login...';
            this.toastType = 'success';
            this.showToast = true;
            setTimeout(() => {
              this.toggleForm(); // Switch to login form
            }, 2000);
          }
        } else {
          // Handle error response
          this.toastMessage = result.message || 'Something went wrong';
          this.toastType = 'error';
          this.showToast = true;
        }
      } catch (error) {
        this.toastMessage = 'An error occurred. Please try again.';
        this.toastType = 'error';
        this.showToast = true;
      }
    }
  }
};
</script>

<style scoped>
.fixed {
  z-index: 9999; /* Ensure this modal is above everything else */
}
</style>
