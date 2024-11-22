<template>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <div class="background_container bg-cover bg-no-repeat">
    <!-- Add the Dash Header as the Header -->
    <dashHeader />

    <div class="bbackground_container py-8">
      <!-- Dashboard Content -->
      <div class="flex justify-around gap-20 px-20">
        <div class="w-full flex flex-col items-center text-center py-10 px-10 gap-10 bg-white rounded-lg">
          <i class="fa-solid fa-clipboard fa-2xl"></i>
          <span class="font-bold" >Listings</span>
          <span>Manage and edit 
            <br>
            your property listings here</span>
          <router-link
            to="/listings"
            class="flex items-center  py-2 px-5  text-white rounded-lg bg-red-500 hover:bg-red-600 hover:shadow-gray-600 hover:shadow-lg transition duration-300 group">
            View Listings
          </router-link>
        </div>

        <div class="w-full flex flex-col items-center text-center py-10 px-10 gap-10 bg-white rounded-lg">
          <i class="fa-solid fa-calendar fa-2xl"></i>
          <span class="font-bold" >Bookings</span>
          <span>Track your upcoming
            <br>
            and past bookings
          </span>
          <router-link
            to="/bookings"
            class="flex items-center  py-2 px-5  text-white rounded-lg bg-red-500 hover:bg-red-600 hover:shadow-gray-600 hover:shadow-lg transition duration-300 group">
            View Bookings
          </router-link>
        </div>

        <div class="w-full flex flex-col items-center text-center py-10 px-10 gap-10 bg-white rounded-lg">
          <i class="fa-solid fa-comment fa-2xl"></i>
          <span class="font-bold" >Reviews</span>
          <span>Manage reviews and feedback
            <br>
            from your guests
          </span>
          <router-link
            to="/reviews"
            class="flex items-center  py-2 px-5  text-white rounded-lg bg-red-500 hover:bg-red-600 hover:shadow-gray-600 hover:shadow-lg transition duration-300 group">
            View Reviews
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importing the Header (DashHeader) component
import dashHeader from '@/components/dashHeader.vue';
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  name: 'Dashboard',
  components: {
    dashHeader,
  },
  mounted() {
  },
};

</script>

<style scoped>

/* Optional styling for text readability over the image */
h2 {
  font-size: 1.25rem;
  color: #333; /* Adjust color for better contrast with the background */
}

p {
  font-size: 0.875rem;
  color: #555; /* Adjust color for better contrast with the background */
}
.background_container{
  font-family:'Poppins', sans-serif;
  background-image: url('../public/images/listingpictures/livingroom_bg.jpg');
  background-size: cover;
  background-repeat: no-repeat; 
  background-position: center; 
  height: 100vh; 
  width: 100%; 
  font-family: 'Poppins', sans-serif;
}
</style>

