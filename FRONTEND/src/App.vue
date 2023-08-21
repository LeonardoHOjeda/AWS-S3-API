<template>
  <SideBar />
  <div class="sm:ml-64">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import SideBar from '@/components/SideBar.vue'
</script>

<style scoped></style>
