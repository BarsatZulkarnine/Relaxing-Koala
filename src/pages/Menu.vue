<template>
  <div>
    <main class="bg-gray-100 py-12 md:py-16 lg:py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-4 md:mb-6">Menu</h2>
        <div class="flex justify-between items-center mb-6">
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <Button v-for="filter in filters" :key="filter" :label="filter" @click="setActiveFilter(filter)"
              :class="{ 'p-button-outlined': activeFilter !== filter }" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          <router-link v-for="item in paginatedItems" :key="item.id"
            :to="{ name: 'menuItem', params: { itemId: item.id } }">
            <div class="bg-white rounded-lg shadow-lg dark:bg-gray-950 dark:shadow-none cursor-pointer">
              <img :src="item.image" :alt="item.name" class="rounded-t-lg object-cover w-full h-48" />
              <div class="p-4">
                <h3 class="text-lg font-bold mb-2">{{ item.name }}</h3>
                <p class="text-gray-500 dark:text-gray-400 mb-4">{{ item.description }}</p>
                <div class="flex items-center justify-between">
                  <span class="font-bold text-gray-900 dark:text-gray-50">{{ item.price }}</span>
                  <Button label="Order" class="p-button-outlined" />
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="flex justify-center items-center mt-6">
          <Button :disabled="currentPage === 1" @click="prevPage" class="font-bold">Previous</Button>
          <span class="mx-4 font-bold">{{ currentPage }} / {{ totalPages }}</span>
          <Button :disabled="currentPage === totalPages" @click="nextPage" class="font-bold">Next</Button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import { useStore } from 'vuex';

const filters = ['Appetizers', 'Mains', 'Desserts', 'Drinks'];
const activeFilter = ref(null);
const currentPage = ref(1);
const itemsPerPage = 8;

const store = useStore();
const menuItems = computed(() => store.state.menu.menuItems);

const setActiveFilter = (filter) => {
  if (activeFilter.value === filter) {
    activeFilter.value = null;
  } else {
    activeFilter.value = filter;
  }
  currentPage.value = 1;
};

const filteredItems = computed(() => {
  if (!activeFilter.value) {
    return menuItems.value;
  }
  return menuItems.value.filter(item => item.category === activeFilter.value);
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredItems.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
