<template>
  <div class="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
    <div class="hidden border-r bg-gray-100/40 lg:block">
      <div class="flex flex-col gap-2">
        <div class="flex h-[60px] items-center px-6">
          <router-link class="flex items-center gap-2 font-semibold" to="#" @click="activeComponent = 'dashboard'">
            <font-awesome-icon icon="utensils" class="h-6 w-6" />
            <span>Relaxing Koala</span>
          </router-link>
        </div>
        <nav class="grid items-start px-4 pl-16 text-sm font-medium">
          <!-- Other existing links -->
          <router-link
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900  "
            to="#" @click="activeComponent = 'orders'">
            <font-awesome-icon icon="shopping-cart" class="h-4 w-4" />
            Order Management
          </router-link>
          <!-- Add click handlers to other links to set activeComponent -->
          <router-link
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
            to="#" @click="activeComponent = 'menuManagement'">
            <font-awesome-icon icon="utensils" class="h-4 w-4" />
            Menu Management
          </router-link>
          <!-- Replace the 'router-link' for Reporting with 'a' tag -->
          <router-link
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900  cursor-not-allowed"
            to="#" @click.prevent>
            <font-awesome-icon icon="chart-line" class="h-4 w-4" />
            Reporting
          </router-link>
        </nav>
      </div>
    </div>
    <div class="flex flex-col">
      <component :is="components[activeComponent]" />
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUtensils, faSearch } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'
 

library.add(faUtensils, faSearch)

const activeComponent = ref('dashboard'); // Default active component

const dashboardComponent = defineAsyncComponent(() => import('@/components/AdminDashboard.vue'));
const menuManagementComponent = defineAsyncComponent(() => import('@/components/AdminMenuManagement.vue'));
const ordersComponent = defineAsyncComponent(() => import('@/components/Orders.vue'));
const components = {
  dashboard: dashboardComponent,
  menuManagement: menuManagementComponent,
  orders: ordersComponent
};
</script>
