<template>
  <button
    type="button"
    class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    @click="toogleSideBar"
  >
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      />
    </svg>
  </button>

  <aside
    id="sidebar-multi-level-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform"
    :class="{
      'translate-x-0 ease-in': isVisibleSideBar,
      '-translate-x-full ease-out': !isVisibleSideBar
    }"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <p class="dark:text-white p-2 text-center font-bold">Administrador de Tenants</p>
      <hr class="mb-3" />
      <div class="font-medium">
        <div
          class="flex items-center p-2 rounded-lg hover:cursor-pointer hover:bg-blue-200 dark:text-white dark:hover:bg-gray-700"
        >
          <!-- Main Menu -->
          <font-awesome-icon icon="fa-solid fa-chart-pie" />
          <router-link to="/" class="ml-3">Menu Principal</router-link>
        </div>
        <!-- Tenants -->
        <div
          class="flex justify-between items-center p-2 rounded-lg hover:cursor-pointer hover:bg-blue-200 dark:text-white dark:hover:bg-gray-700"
          @click="toogleTenantList"
        >
          <div>
            <font-awesome-icon icon="fa-solid fa-building" />
            <span class="ml-3">Tenants</span>
          </div>
          <div>
            <font-awesome-icon
              icon="justify-end fa-solid fa-chevron-down"
              class="transition transform duration-300"
              :class="isVisibleTenantList ? 'rotate-180' : ''"
            />
          </div>
        </div>
        <!-- Hijo -->
        <div
          class="items-center ml-5 rounded-lg max-h-0 overflow-hidden hover:cursor-pointer hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700 duration-500 py-0"
          :class="{
            'max-h-[100px] py-2': isVisibleTenantList
          }"
        >
          <router-link to="/tenants" class="">
            <div class="px-2">
              <font-awesome-icon icon="fa-solid fa-list" />
              Lista Tenants
            </div>
          </router-link>
        </div>
        <!-- Archivos -->
        <div>
          <!-- Menu Archivos -->
          <div
            class="flex justify-between items-center p-2 rounded-lg hover:cursor-pointer hover:bg-blue-200 dark:text-white dark:hover:bg-gray-700 group"
            @click="toggleFilesList"
          >
            <!-- FontAwesomeIcon -->
            <div>
              <font-awesome-icon icon="fa-solid fa-file-lines" />
              <router-link to="/" class="ml-3">Archivos</router-link>
            </div>
            <!-- Fin FontAwesomeIcon -->
            <!-- FontAwesomeIcon Chevron-->
            <div>
              <font-awesome-icon
                icon="justify-end fa-solid fa-chevron-down"
                class="transition transform duration-300"
                :class="isVisibleFileList ? 'rotate-180' : ''"
              />
            </div>
            <!-- Fin FontAwesomeIcon Chevron -->
          </div>
          <!-- Fin Menu Archivos -->
          <!-- Menu Lista Archivos Base de Datos -->
          <div
            class="items-center ml-5 rounded-lg max-h-0 overflow-hidden hover:cursor-pointer hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700 duration-500 py-0"
            :class="{
              'max-h-[100px] py-2': isVisibleFileList
            }"
          >
            <router-link to="/database-files" class="">
              <div class="px-2">
                <font-awesome-icon icon="fa-solid fa-database" />
                Lista Archivos en Base de Datos
              </div>
            </router-link>
          </div>
          <!-- Fin Menu Lista Archivos Base de Datos -->
          <!-- Menu Lista Archivos AWS -->
          <div
            class="items-center ml-5 rounded-lg max-h-0 overflow-hidden hover:cursor-pointer hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700 duration-500 py-0"
            :class="{
              'max-h-[100px] py-2': isVisibleFileList
            }"
          >
            <router-link to="/aws-files" class="">
              <div class="px-2">
                <font-awesome-icon icon="fa-brands fa-aws" />
                Lista Archivos en AWS
              </div>
            </router-link>
          </div>
          <!-- Fin Menu Lista Archivos AWS -->
        </div>
        <!-- Fin Archivos -->
      </div>
    </div>
    <div class="fixed bottom-0 text-center left-0 p-4 z-10 w-full dark:text-white flex items-center justify-center">
      <span class="mr-2">
        <font-awesome-icon icon="fas fa-sun" class="text-yellow-500 dark:text-gray-300" />
      </span>
      <label class="relative inline-flex items-center cursor-pointer">
        <input v-model="darkMode" type="checkbox" value class="sr-only peer" />
        <div
          class="w-11 h-6 bg-yellow-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-200 dark:peer-focus:ring-gray-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"
        ></div>
        <span>
          <font-awesome-icon icon="fas fa-moon" class="text-indigo-600 dark:text-gray-500 ml-2" />
        </span>
      </label>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Ref, inject, ref, watchEffect } from 'vue'
import { storageService } from '../services/storage.service'

const darkMode = ref(storageService.theme === 'dark')
const isVisibleTenantList = ref(false)
const isVisibleFileList = ref(false)
const isVisibleSideBar = inject<Ref<boolean>>('isVisibleSideBar')!

const toogleTenantList = () => {
  isVisibleTenantList.value = !isVisibleTenantList.value
  if (isVisibleFileList.value) {
    isVisibleFileList.value = false
  }
}

const toggleFilesList = () => {
  isVisibleFileList.value = !isVisibleFileList.value
  if (isVisibleTenantList.value) {
    isVisibleTenantList.value = false
  }
}

const toogleSideBar = inject<() => void>('toogleSideBar')!

watchEffect(() => {
  storageService.theme = darkMode.value ? 'dark' : 'light'
  document.documentElement.classList.toggle('dark', darkMode.value)
})
</script>

<style scoped>
.elemento {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s ease;
}

.animar {
  transition: max-height 0.5s ease;
}
</style>
