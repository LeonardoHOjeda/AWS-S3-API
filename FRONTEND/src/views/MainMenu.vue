<template>
  <div class="p-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full place-items-center items-start gap-5">
    <router-link to="/tenants">
      <div
        class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Tenants</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          "Tenants" son entidades en el sistema que representan empresas individuales. Cada una tiene su propio nombre y
          base de datos. Estos permiten manejar datos de diferentes empresas de manera segura, con opciones para crear,
          editar y ver información específica para cada "tenant".
        </p>
      </div>
    </router-link>
    <router-link to="/tenants">
      <div
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Archivos</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Los archivos son documentos que se pueden subir al sistema. Estos pueden ser de cualquier tipo, y se pueden
          ver y descargar desde el sistema que se está usando. Los archivos se suben a un directorio en específico, cuyo
          nombre se conforma por el nombre del tenant y el nombre del archivo.
        </p>
      </div>
    </router-link>
    <router-link to="/tenants">
      <div
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
