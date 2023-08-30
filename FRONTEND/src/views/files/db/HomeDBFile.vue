<template>
  <div class="container">
    <ConfirmDialog></ConfirmDialog>
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
        v-model:selection="selectedFile"
        data-key="uuid"
        :global-filter-fields="['nombreArchivo']"
        :rows-per-page-options="[5, 10, 20, 50]"
        :rows="10"
        :value="files"
        edit-mode="row"
        paginator
        removable-sort
        resizable-columns
        selection-mode="single"
        class="hover:bg-gray-100 dark:hover:bg-green-700"
      >
        <template #header>
          <div class="flex justify-around items-center">
            <div>
              <button
                v-if="selectedFile"
                class="px-4 py-2 rounded-md bg-red-400 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-800 dark:text-white"
                :class="{ 'bg-red-100 hover:bg-red-100 cursor-not-allowed': selectedFile === null }"
                @click="confirmDelete"
              >
                Eliminar archivo
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
              <button v-else class="text-gray-500 px-4 py-2 rounded-md cursor-not-allowed bg-red-200 hover:bg-red-200">
                Eliminar archivo
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                <!-- Aquí puedes insertar tu icono -->
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
              </span>
              <InputText v-model="filters['global'].value" placeholder="Buscar por nombre" class="pl-9" />
            </div>
          </div>
        </template>
        <template #empty>No se encontró ningun archivo con ese nombre</template>
        <Column field="id" header="ID"></Column>
        <Column field="uuid" header="ID ÚNICO"></Column>
        <Column field="nombreArchivo" header="NOMBRE">
          <template #body="{ data }">
            <div class="transition-colors duration-300" :class="{ 'bg-green-200 dark:bg-green-600': data.isSelected }">
              {{ data.nombreArchivo }}
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              class="p-column-filter"
              placeholder="Search by name"
              @input="filterCallback()"
            />
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
import { FilterMatchMode } from 'primevue/api'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'

// import { useToast } from 'primevue/usetoast'
import { FileDatabase } from '@/models/file.model'
import { filesService } from '@/services/files.service'
import { formatDate } from '@/utils/helpers'

const confirm = useConfirm()
const toast = useToast()

const files = ref<FileDatabase[]>([])
const selectedFile = ref<FileDatabase | null>(null)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  nombreArchivo: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})

const confirmDelete = () => {
  console.log('Confirm delete')
  confirm.require({
    message: `¿Estas seguro de eliminar el archivo - ${selectedFile.value?.nombreArchivo}?`,
    header: 'Confirmar eliminación',
    acceptLabel: 'Sí', // Cambiar el texto del botón "Yes" a "Sí"
    acceptClass: 'text-black', // Clase para el botón "Sí" con color de éxito
    accept: () => {
      try {
        filesService.deleteFileFromDatabase(selectedFile.value?.uuid!)
        toast.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Has eliminado el archivo de manera exitosa',
          life: 3000
        })
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error al eliminar',
          detail: 'Hubo un error al eliminar el archivo, intente de nuevo mas tarde',
          life: 3000
        })
      }
    }
  })
}

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

<style scoped>
.p-datatable-selection .p-datatable-tbody > tr.p-highlight {
  background-color: #f5f5f5; /* Cambia el color de fondo según tu preferencia */
}
</style>
