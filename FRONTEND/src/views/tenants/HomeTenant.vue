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
          class="bg-green-300 px-4 py-2 font-bold rounded-md dark:bg-green-700 dark:text-white"
          @click="showModal = true"
        >
          <font-awesome-icon icon="fa-solid fa-circle-plus" />
          Crear Tenant
        </button>
      </div>
      <ModalComponent v-if="showModal" title="Crear Tenant">
        <p>Slot</p>
      </ModalComponent>
      <DataTable
        v-model:editingRows="editingRows"
        :value="tenants"
        edit-mode="row"
        @row-edit-save="onRowEditSave"
      >
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
        <Column
          :row-editor="true"
          style="width: 10%; min-width: 8rem"
          body-style="text-align:center"
        ></Column>
      </DataTable>
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

const showModal = ref(false)
const tenants = ref<Array<Tenant>>([])
const editingRows = ref<Tenant[]>([])

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

const loadTenants = async () => {
  try {
    tenants.value = await tenantService.fetchTenants()

    console.log('Tenants', tenants.value)
  } catch (error) {
    console.error('Error', error)
  }
}

// Llama a la función cuando el componente se monte
onMounted(loadTenants)
</script>

<style scoped></style>
