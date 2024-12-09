<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
      <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 class="text-3xl font-bold text-red-600 mb-8 text-center">{{ isLogin ? 'Login' : 'Register' }}</h2>
      <p v-if="errorMessage" class="text-red-500 text-center mb-4">{{ errorMessage }}</p>

      <!-- Scrollable Content -->
      <div class="space-y-6">
        <form @submit.prevent="handleSubmit">
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
                <option value="1">Renter</option>
                <option value="2">Host</option>
                <option value="3">Admin</option>
              </select>
            </div>
            <div>
              <label for="profilePic" class="block text-sm font-medium text-gray-700">Profile Picture</label>
              <input @change="handleFileChange" type="file" id="profilePic" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              <img v-if="profilePicUrl" :src="profilePicUrl" alt="Profile Preview" class="mt-4 w-24 h-24 object-cover rounded-full border border-gray-300" />
            </div>
            <div>
              <label for="document" class="block text-sm font-medium text-gray-700">Upload Document</label>
              <p class="text-xs text-gray-500 mb-2">Example: Driver's License, Birth Certificate, etc.</p>
              <input @change="handleDocumentChange" type="file" id="document" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              
              <!-- Preview of Document Image -->
              <div v-if="documentPreviewUrl" class="mt-4">
                <p class="text-sm text-gray-700 mb-2">Document Preview:</p>
                <img :src="documentPreviewUrl" alt="Document Preview" class="w-32 h-32 object-cover border border-gray-300 rounded-lg" />
              </div>
            </div>
            <button type="button" @click="toggleForm" class="text-red-600 hover:underline">Switch to Login</button>
          </div>
          <button type="submit" class="w-full bg-red-600 text-white rounded-full py-3 px-4 text-lg font-semibold hover:bg-red-700 transition duration-300">Submit</button>
        </form>
      </div>

      <Toast v-if="showToast" :message="toastMessage" @close="showToast = false" />
    </div>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: { Toast },
  data() {
    return {
      isLogin: true,
      errorMessage: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      profilePic: null,
      profilePicUrl: '',
      documentFile: null,
      documentPreviewUrl: '',
      roleId: '',
      showToast: false,
      toastMessage: '',
      toastType: 'success',
    };
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
      this.errorMessage = '';
      this.profilePic = null;
      this.profilePicUrl = '';
      this.documentFile = null;
      this.documentPreviewUrl = '';
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.profilePic = file;
        this.profilePicUrl = URL.createObjectURL(file);
      }
    },
    handleDocumentChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.documentFile = file;
        this.documentPreviewUrl = URL.createObjectURL(file);
      } else {
        this.documentPreviewUrl = null;
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

        // Append the profile picture if exists
        if (this.profilePic) {
          formData.append('profilePic', this.profilePic);
        }

        // Append the document file if exists
        if (this.documentFile) {
          formData.append('document', this.documentFile);
        }

        const response = await fetch('/api/auth', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          if (this.isLogin) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('userId', result.userId);
            let redirectPath;
            if (result.roleId === 1) {
              redirectPath = '/userDashboard';
            } else if (result.roleId === 2) {
              redirectPath = '/dashboard';
            } else if (result.roleId === 3) {
              redirectPath = '/admin';
            } else {
              // Default redirect if role is not recognized
              redirectPath = '/';
            }
            toast.success("Login successful! Redirecting...", {
              autoClose: 2000
            });
            this.toastMessage = result.message || 'Login successful! Redirecting...';
            this.toastType = 'success';
            this.showToast = true;
            setTimeout(() => {
              window.location.href = redirectPath;
            }, 2000);
          } else {
            // Registration success code (unchanged)
            this.isLogin = true;
            this.name = '';
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
            this.phone = '';
            this.profilePic = null;
            this.profilePicUrl = '';
            this.documentFile = null;
            this.documentPreviewUrl = '';
            toast.success(result.message || 'Registration successful! Redirecting to login...', {
              autoClose: 2000
            });
            this.toastMessage = result.message || 'Registration successful! Redirecting to login...';
            this.toastType = 'success';
            this.showToast = true;
          }
        } else {
          this.errorMessage = result.message || 'An error occurred.';
        }
      } catch (error) {
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    },
  },
  beforeDestroy() {
    if (this.profilePicUrl) {
      URL.revokeObjectURL(this.profilePicUrl);
    }
    if (this.documentPreviewUrl) {
      URL.revokeObjectURL(this.documentPreviewUrl);
    }
  },
};
</script>


<style scoped>
/* Optional styles */
</style>
