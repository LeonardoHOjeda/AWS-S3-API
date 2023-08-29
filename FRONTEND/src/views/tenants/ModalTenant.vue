<template>
  <div>
    <ModalComponent :title="title" :subtitle="subtitle">
      <!-- Contenido del modal -->
      <font-awesome-icon
        icon="fa-solid fa-times"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        @click="closeModal"
      />
    </ModalComponent>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: String,
  subtitle: String
})

const { emit } = defineEmits()

const closeModal = () => {
  emit('closeModal') // Emitir evento para cerrar el modal
}
</script>

<style scoped></style>
