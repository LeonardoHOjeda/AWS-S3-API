<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div class="container">
    <h1
      class="text-center py-5 mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
    >
      Lista de Tenants
    </h1>
    <div class="mx-4">
      <DataTable :value="tenants" editMode="row">
        <Column field="nombre" header="NOMBRE"></Column>
        <Column field="uuid" header="ID UNICO"></Column>
        <Column field="presignedURLTime" header="TIEMPO (MS)"></Column>
        <Column
          :rowEditor="true"
          style="width: 10%; min-width: 8rem"
          bodyStyle="text-align:center"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tenant } from '@/models/tenant.model'
import { tenantService } from '@/services/tenants.service'
import { onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const tenants = ref<Array<Tenant>>([])
const editingRows = ref<Tenant[]>([])

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
