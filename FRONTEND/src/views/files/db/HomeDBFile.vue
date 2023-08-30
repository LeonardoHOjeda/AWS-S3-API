<template>
  <div class="container">
    <div class="py-5 mb-4">
      <h1
        class="text-center text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
      >
        Lista de Archivos
      </h1>
      <h2
        class="text-center p-0 m-0 text-3xl font-bold leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
      >
        en base de datos
      </h2>
    </div>
    <div class="mx-4">
      <DataTable
        v-model:filters="filters"
        :global-filter-fields="['nombreArchivo']"
        :value="files"
        removable-sort
        edit-mode="row"
        resizable-columns
        striped-rows
        paginator
        :rows="10"
        :rows-per-page-options="[5, 10, 20, 50]"
      >
        <template #header>
          <div class="flex justify-end">
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                <!-- Aquí puedes insertar tu icono -->
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
              </span>
              <InputText v-model="filters['global'].value" placeholder="Buscar por nombre" class="pl-9"/>
            </div>
          </div>
        </template>
        <template #empty>No se encontró ningun archivo con ese nombre</template>
        <Column field="id" header="ID"></Column>
        <Column field="uuid" header="ID ÚNICO"></Column>
        <Column field="nombreArchivo" header="NOMBRE">
          <template #body="{ data }">
            {{ data.nombreArchivo }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
          </template>
        </Column>
        <Column field="createdAt" header="FECHA DE CREACIÓN" sortable>
          <template #body="slotProps">
            {{ formatDate(slotProps.data.createdAt) }}
          </template>
        </Column>
        <Column field="tenantUuid" header="TENANT ID"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { FilterMatchMode } from 'primevue/api'
import InputText from 'primevue/inputtext';
// import { useToast } from 'primevue/usetoast'
import { FileDatabase } from '@/models/file.model'
import { filesService } from '@/services/files.service'
import { formatDate } from '@/utils/helpers'

const files = ref<FileDatabase[]>([])

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombreArchivo: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})

const loadFiles = async () => {
  try {
    files.value = await filesService.getFilesFromDatabase()

    console.log('Files: ', files.value)
  } catch (error) {
    console.log('Error: ', error)
  }
}

// Llama a la función cuando el componente se monte
onMounted(loadFiles)
</script>

<style scoped></style>
