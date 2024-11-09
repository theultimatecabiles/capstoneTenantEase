<template>
  <div
    v-if="show"
    class="fixed bottom-4 right-4 py-2 px-4 rounded-lg shadow-lg z-50 transition-opacity"
    :style="{ opacity: opacity, backgroundColor: toastStyle }"
    role="alert"
    aria-live="assertive"
  >
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'success' // Default to 'success', can be 'error'
    }
  },
  data() {
    return {
      opacity: 1 // Initial opacity for fade effect
    };
  },
  computed: {
    toastStyle() {
      return this.type === 'error' ? 'bg-red-500' : 'bg-green-500'; // Set background based on toast type
    }
  },
  watch: {
    show(newValue) {
      if (newValue) {
        this.opacity = 1; // Reset opacity
        setTimeout(() => {
          this.fadeOut(); // Start fade-out after 3 seconds
        }, 3000);
      }
    }
  },
  methods: {
    fadeOut() {
      const fadeEffect = setInterval(() => {
        if (this.opacity <= 0.1) {
          clearInterval(fadeEffect); // Stop fading
          this.$emit('close'); // Emit close event to hide toast
        }
        this.opacity -= 0.1; // Gradually decrease opacity
      }, 100); // Fade out over time
    }
  }
};
</script>

<style scoped>
/* Additional styles can be added here */
</style>
