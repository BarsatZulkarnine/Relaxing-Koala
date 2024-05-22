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
          <router-link
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900  "
            to="#" @click="activeComponent = 'orders'">
            <font-awesome-icon icon="shopping-cart" class="h-4 w-4" />
            Order Management
          </router-link>
          <router-link
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
            to="#" @click="activeComponent = 'menuManagement'">
            <font-awesome-icon icon="utensils" class="h-4 w-4" />
            Menu Management
          </router-link>
          <router-link
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
            to="#" @click="activeComponent = 'reservation'">
            <font-awesome-icon icon="utensils" class="h-4 w-4" />
            Reservations
          </router-link>
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
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'


const activeComponent = ref('dashboard');

const dashboardComponent = defineAsyncComponent(() => import('@/components/AdminDashboard.vue'));
const menuManagementComponent = defineAsyncComponent(() => import('@/components/AdminMenuManagement.vue'));
const ordersComponent = defineAsyncComponent(() => import('@/components/Orders.vue'));
const reservationCompoment = defineAsyncComponent(() => import('@/components/Reservation.vue'));
const components = {
  dashboard: dashboardComponent,
  menuManagement: menuManagementComponent,
  orders: ordersComponent,
  reservation : reservationCompoment
};
</script>
