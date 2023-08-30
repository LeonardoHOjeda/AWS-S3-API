<template>
  <div class="dark:bg-gray-600">
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <SideBar :is-visible-side-bar="isVisibleSideBar" />
    <div
      v-if="isVisibleSideBar"
      class="blur fixed top-0 bottom-0 left-0 right-0 z-10 sm:hidden"
      @click="toggleSideBar"
    ></div>
    <div class="sm:ml-64 min-h-screen z-0 sm:blur-0" :class="{ blur: isVisibleSideBar }">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import SideBar from '@/components/SideBar.vue'

const isVisibleSideBar = ref(false)
useMediaQuery(640, (matches) => {
  isVisibleSideBar.value = matches
})
const toggleSideBar = () => {
  isVisibleSideBar.value = !isVisibleSideBar.value
}
provide('isVisibleSideBar', isVisibleSideBar)
provide('toogleSideBar', toggleSideBar)
</script>

<style scoped></style>
