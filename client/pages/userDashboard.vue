<template>
    <div class="min-h-screen flex flex-col bg-gray-100">
      <userHeader />
      <main class="flex-grow flex flex-col lg:flex-row mt-4">
        <aside class="w-full lg:w-96 bg-white border-r border-gray-300 rounded-lg shadow-lg p-4">
          <ListingBar :listings="listings" />
        </aside>
        <section class="flex-grow bg-white border border-gray-300 rounded-lg shadow-lg p-4 mt-4 lg:mt-0 lg:ml-4">
          <client-only>
            <Map />
          </client-only>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  import userHeader from '~/components/userHeader.vue'
  import ListingBar from '~/components/ListingBar.vue'
  import Map from '~/components/Map.vue'
  
  export default {
    components: {
      userHeader,
      ListingBar,
      Map,
    },
    data() {
      return {
        listings: [],
      }
    },
  }
  </script>
  
  <style scoped>
  /* Scoped styles for the main component */
  </style>