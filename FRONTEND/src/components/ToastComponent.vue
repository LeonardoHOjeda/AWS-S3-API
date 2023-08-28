<!-- eslint-disable vue/require-default-prop -->
<template>
  <div
    class="flex flex-col justify-evenly max-w-xs rounded-lg shadow dark:text-white m-5 border-2"
    :class="{
      'bg-green-100 dark:bg-green-500': typeMessage === 'success',
      'bg-red-100 dark:bg-red-500': typeMessage === 'danger',
      'bg-blue-100 dark:bg-blue-500': typeMessage === 'info',
      'bg-yellow-100 dark:bg-yellow-500': typeMessage === 'warning',
      'dark:bg-gray-800': isDarkMode
    }"
  >
    <div class="flex p-4" role="alert">
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 dark:text-white"
        :class="{
          'text-green-500 dark:text-white-800': typeMessage === 'success',
          'text-red-500 dark:text-white-800': typeMessage === 'danger',
          'text-blue-500 dark:text-white-800': typeMessage === 'info',
          'text-yellow-500 dark:text-white-800': typeMessage === 'warning',
          'dark:text-white': isDarkMode
        }"
      >
        <font-awesome-icon :icon="iconType" class="ml-2 text-2xl" />
        <!-- Icono aquí -->
      </div>
      <div class="ml-3 text-lg font-normal">{{ message }}</div>
      <button type="button" class="ml-auto hover:text-gray-100">
        <font-awesome-icon icon="fa-xmark" class="ml-2 text-2xl" />
      </button>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2.5">
      <div
        class="h-2.5 w-full absolute top-0 left-0 bg-blue-600 animate-progress"
        :style="{ width: progressBarWidth }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import {
  faExclamationCircle,
  faInfoCircle,
  faCheckCircle,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons'

const timeRemaining = ref(5000) // Tiempo en milisegundos
const progressBarWidth = computed(
  () => `${Math.max((timeRemaining.value / 5000) * 100, 0)}%`
)

const props = defineProps({
  typeMessage: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  isDarkMode: Boolean
})

const interval = setInterval(() => {
  timeRemaining.value -= 1000 // Reducir en 1000 ms (1 segundo)
  if (timeRemaining.value <= 0) {
    clearInterval(interval)
  }
}, 1000)

onBeforeUnmount(() => {
  clearInterval(interval) // Limpiar el intervalo al desmontar el componente
})

const iconType = computed(() => {
  switch (props.typeMessage) {
    case 'success':
      return faCheckCircle
    case 'danger':
      return faExclamationCircle
    case 'info':
      return faInfoCircle
    case 'warning':
      return faTriangleExclamation
    default:
      return faInfoCircle
  }
})
</script>
<style scoped>
.animate-progress {
  animation: progressAnimation 5s linear infinite;
}

@keyframes progressAnimation {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
