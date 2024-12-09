<template>
    <div class="w-64 bg-white text-red-500 h-full flex flex-col">
      <div class="p-4 text-center text-xl font-bold border-b border-gray-200">
        Admin Panel
      </div>
      <ul class="flex-1">
        <li
          v-for="item in navItems"
          :key="item"
          @click="selectNav(item)"
          class="cursor-pointer p-4 hover:bg-red-100"
          :class="{ 'bg-red-100': item === selected }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        navItems: ["Users", "Listings"],
        selected: "Users", // Default selected
      };
    },
    methods: {
      selectNav(item) {
        this.selected = item;
        this.$emit("navChange", item);
      },
    },
  };
  </script>
  