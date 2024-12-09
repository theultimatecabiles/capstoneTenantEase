// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-free/css/all.min.css',
    'leaflet-routing-machine/dist/leaflet-routing-machine.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2024-09-06',

  // Add the plugins configuration
  plugins: [
    { src: '~/plugins/leaflet.client.js', mode: 'client' }
  ],
})
