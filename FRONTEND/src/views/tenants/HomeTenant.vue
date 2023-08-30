<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <div class="container">
    <h1
      class="text-center py-5 mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
    >
      Lista de Tenants
    </h1>
    <div class="mx-4">
      <div class="flex justify-end mb-3">
        <button
          class="bg-green-300 px-4 py-2 font-bold rounded-md hover:bg-green-400 dark:bg-green-700 dark:text-white dark:hover:bg-green-800"
          @click="showModal = true"
        >
          <font-awesome-icon icon="fa-solid fa-circle-plus" />
          Crear Tenant
        </button>
      </div>
      <ModalComponent v-if="showModal" title="Crear Tenant">
        <div>
          <div>
            <label for="tenant" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tenant</label>
            <input
              v-model="tenantName"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tenant_Name"
            />
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Introduce el nombre del tenant que se quiere registrar
            </p>
          </div>
          <div class="flex justify-evenly">
            <button
              class="mt-5 bg-red-300 px-4 py-2 font-bold rounded-md hover:bg-red-400 dark:bg-red-700 dark:text-white dark:hover:bg-red-800"
              @click="closeModal"
            >
              Cancelar
            </button>
            <button
              class="bg-green-300 px-4 py-2 font-bold rounded-md mt-5 hover:bg-green-400 dark:bg-green-700 dark:text-white dark:hover:bg-green-800"
              @click="createTenant"
            >
              Registrar Tenant
              <font-awesome-icon icon="fa-solid fa-cloud-arrow-up" />
            </button>
          </div>
        </div>
      </ModalComponent>
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
        <DataTable v-model:editingRows="editingRows" :value="tenants" edit-mode="row" @row-edit-save="onRowEditSave">
          <Column field="id" header="ID"></Column>
          <Column field="nombre" header="NOMBRE">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
          </Column>
          <Column field="uuid" header="ID UNICO"></Column>
          <Column field="presignedURLTime" header="TIEMPO (MS)">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
          </Column>
          <Column :row-editor="true" style="width: 10%; min-width: 8rem" body-style="text-align:center"></Column>
        </DataTable>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'

import { Tenant } from '@/models/tenant.model'
import { tenantService } from '@/services/tenants.service'
import ModalComponent from '@/components/ModalComponent.vue'

const toast = useToast()

const isLoading = ref(true)
const showModal = ref(false)
const tenants = ref<Tenant[]>([])
const editingRows = ref<Tenant[]>([])

const tenantName = ref('')

const createTenant = async () => {
  try {
    const tenant = await tenantService.createTenant(tenantName.value)
    tenants.value.push(tenant)
    toast.add({
      severity: 'success',
      summary: 'Creado',
      detail: 'El Tenant ha sido creado',
      life: 4000
    })
    tenantName.value = ''
    closeModal()
  } catch (error) {
    console.log('Error en createTenant', error)
    toast.add({
      severity: 'error',
      summary: 'Error al crear tenant',
      detail: `Hubo un error al crear el tenant ${error}`,
      life: 5000
    })
    closeModal()
  }
}

const onRowEditSave = (event: any) => {
  try {
    const { newData, index } = event
    tenantService.updateTenantById(newData.uuid, {
      ...newData,
      presignedURLTime: parseInt(newData.presignedURLTime)
    })
    toast.add({
      severity: 'success',
      summary: 'Editado',
      detail: 'El Tenant ha sido editado',
      life: 4000
    })
    tenants.value[index] = newData
  } catch (error) {
    console.log('Error en onRowEditSave', error)
    toast.add({
      severity: 'error',
      summary: 'Error al editar tenant',
      detail: `Hubo un error al editar el tenant ${error}`,
      life: 5000
    })
  }
}

const closeModal = () => {
  console.log('Close Modal')

  showModal.value = false
}

const loadTenants = async () => {
  try {
    tenants.value = await tenantService.fetchTenants()
    isLoading.value = false

    console.log('Tenants', tenants.value)
  } catch (error) {
    console.error('Error', error)
  }
}

// Llama a la función cuando el componente se monte
onMounted(loadTenants)
</script>

<style scoped></style>
