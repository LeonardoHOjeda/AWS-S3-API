<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-[1201]"
  >
    <div
      class="relative bg-white px-8 pt-8 pb-6 rounded-xl max-h-[800px] overflow-auto dark:bg-gray-700"
      @click="closeModal"
    >
      <div class="w-fit absolute top-4 right-6 p-0 m-0 hover:cursor-pointer">
        <font-awesome-icon icon="fa-solid fa-times" class="text-gray-500 hover:text-gray-600" />
      </div>
      <h2 v-if="title" class="text-center m-0 font-bold text-2xl text-black dark:text-white">
        {{ title }}
      </h2>
      <h3 v-if="subtitle" class="text-center p-0 m-0 mb-2">{{ subtitle }}</h3>
      <div v-if="actions" class="flex justify-end gap-3 mt-5">
        <slot name="actions"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)

defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  actions: {
    type: Array,
    default: () => []
  }
})

const closeModal = () => {
  console.log('Close Modal')

  showModal.value = false
}
</script>

<style scoped></style>
