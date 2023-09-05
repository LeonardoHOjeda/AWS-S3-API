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
    <div>
      <ModalComponent v-if="showModal" title="Eliminar archivo(s)" @close-modal="closeModal">
        <p class="text-xl m-0 p-0 dark:text-white">¿Estás seguro de eliminar el(los) archivo(s) seleccionado(s)?</p>
        <div class="flex justify-evenly mt-3">
          <button class="px-6 py-2 rounded text-white font-bold bg-green-600 hover:bg-green-700" @click="confirmDelete">
            Si
          </button>
          <button class="px-6 py-2 rounded text-white font-bold bg-red-600 hover:bg-red-700" @click="closeModal">
            No
          </button>
        </div>
      </ModalComponent>
    </div>
    <template v-if="isLoading">
      <div role="status" class="text-center">
        <svg
          aria-hidden="true"
          class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </template>
    <template v-else>
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
          :meta-key-selection="false"
          paginator
          removable-sort
          resizable-columns
          selection-mode="multiple"
          class="hover:bg-gray-100 dark:hover:bg-green-700"
        >
          <template #header>
            <div class="flex justify-around items-center">
              <div>
                <button
                  v-if="selectedFile?.length"
                  class="px-4 py-2 rounded-md bg-red-400 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-800 dark:text-white"
                  :class="{ 'bg-red-100 hover:bg-red-100 cursor-not-allowed': selectedFile === null }"
                  @click="showModal = true"
                >
                  Eliminar archivo
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
                <button
                  v-else
                  class="text-gray-500 px-4 py-2 rounded-md cursor-not-allowed bg-red-200 hover:bg-red-200"
                >
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
              <div
                class="transition-colors duration-300"
                :class="{ 'bg-green-200 dark:bg-green-600': data.isSelected }"
              >
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
          <Column field="tenant.nombre" header="TENANT"></Column>
          <Column field="awsBucket" header="BUCKET"></Column>
        </DataTable>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { useToast } from 'primevue/usetoast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'

// import { useToast } from 'primevue/usetoast'
import { FileDatabase } from '@/models/file.model'
import { filesService } from '@/services/files.service'
import { formatDate } from '@/utils/helpers'
import ModalComponent from '@/components/ModalComponent.vue'

const toast = useToast()
const showModal = ref(false)
const isLoading = ref(true)

const files = ref<FileDatabase[]>([])
const selectedFile = ref<FileDatabase[] | null>(null)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  nombreArchivo: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})

const deleteSelectedFiles = () => {
  console.log('Delete selected files')
  if (selectedFile.value) {
    const selectedUuids = selectedFile.value.map((file) => file.uuid)
    files.value = files.value.filter((file) => !selectedUuids.includes(file.uuid))
    selectedFile.value = null
  }
}

const confirmDelete = () => {
  console.log('Confirm delete')
  try {
    console.log('Selected File: ', selectedFile.value)
    selectedFile.value!.forEach((file: FileDatabase) => {
      filesService.deleteFileFromDatabase(file?.uuid!)
    })
    toast.add({
      severity: 'success',
      summary: 'Eliminado',
      detail: 'Se han eliminado el(los) archivo(s) de manera exitosa',
      life: 3000
    })
    deleteSelectedFiles()
  } catch (error) {
    console.log('Error al eliminar archivos seleccioandos: ', error)
    toast.add({
      severity: 'error',
      summary: 'Error al eliminar',
      detail: 'Hubo un error al eliminar el archivo, intente de nuevo mas tarde',
      life: 3000
    })
  }
}

const loadFiles = async () => {
  try {
    files.value = await filesService.getFilesFromDatabase()
    isLoading.value = false

    console.log('Files: ', files.value)
  } catch (error) {
    console.log('Error: ', error)
  }
}

const closeModal = () => {
  console.log('Close Modal')

  showModal.value = false
}

// Llama a la función cuando el componente se monte
onMounted(loadFiles)
</script>

<style scoped>
.p-datatable-selection .p-datatable-tbody > tr.p-highlight {
  background-color: #f5f5f5; /* Cambia el color de fondo según tu preferencia */
}
</style>
