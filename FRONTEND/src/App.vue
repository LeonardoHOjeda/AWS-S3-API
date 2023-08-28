<template>
  <div class="dark:bg-gray-600">
    <SideBar />
    <div class="sm:ml-64">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from '@/components/SideBar.vue'
</script>

<style scoped></style>
