<template>
  <div class="flex flex-col min-h-screen">
    <!-- Main section -->
    <main class="flex-1">
      <!-- Hero section -->
      <section class="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <!-- Hero content -->
        <div class="container px-4 md:px-6">
          <div class="flex flex-col items-center space-y-4 text-center">
            <div class="space-y-2">
              <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Relaxing Koala
              </h1>
              <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Delicious Australian cuisine in a cozy, relaxing atmosphere.
              </p>
            </div>
            <router-link
              to="/menu"
              class="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-900"
            >
              Browse Menu
            </router-link>
          </div>
        </div>
      </section>
      <!-- Menu section -->
      <section class="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="menu">
        <div class="container px-4 md:px-6">
          <div class="space-y-6">
            <div class="space-y-2 text-center">
              <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Menu</h2>
              <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Explore our delectable selection of Australian-inspired dishes.
              </p>
            </div>
            <!-- Dishes grid -->
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <!-- Display dishes -->
              <div v-for="dish in dishes" :key="dish.id" class="rounded-lg bg-white shadow dark:bg-gray-900">
                <img
                  :alt="dish.name"
                  class="h-[200px] w-full rounded-t-lg object-cover"
                  :src="dish.image"
                />
                <div class="p-4">
                  <h3 class="text-lg font-bold">{{ dish.name }}</h3>
                  <p class="text-gray-500 dark:text-gray-400">{{ dish.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Reservation section -->
      <section class="w-full py-12 md:py-24 lg:py-32" id="reserve">
        <div class="container px-4 md:px-6">
          <div class="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div class="space-y-2">
              <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Reserve a Seat</h2>
              <p class="max-w-[600px] text-gray-500 md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
                Book your table at Relaxing Koala today. We'll have it ready for you.
              </p>
            </div>
            <!-- Reservation form -->
            <div class="space-y-4 p-4">
              <div class="space-y-2">
                <label for="date" class="block font-medium text-sm">Date</label>
                <InputText id="date" type="date" v-model="reservation.date" />
              </div>
              <div class="space-y-2">
                <label for="time" class="block font-medium text-sm">Time</label>
                <InputText id="time" type="time" v-model="reservation.time" />
              </div>
              <div class="space-y-2">
                <label for="party" class="block font-medium text-sm">Party Size</label>
                <InputText id="party" type="number" min="1" max="10" v-model="reservation.partySize" />
              </div>
              <Button label="Reserve Table" @click="submitReservation" class="w-full" />
            </div>
          </div>
        </div>
      </section>
    </main>
    <!-- Footer section -->
    <Footer></Footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Footer from '@/components/Footer.vue';

const store = useStore();

const reservation = ref({
  date: '',
  time: '',
  partySize: 1
});

function validateReservation() {
  // Validation logic
}

async function submitReservation() {
  // Submission logic
}

function clearReservation() {
  // Clearing logic
}

// Compute filtered dishes based on menuItems from store
const dishes = computed(() => {
  const menuItems = store.state.menu.menuItems;
  const filteredDishes = [];

  // Find items for each category
  ['Appetizers', 'Mains', 'Desserts', 'Drinks'].forEach(category => {
    const items = menuItems.filter(item => item.category === category);
    if (items.length > 0) {
      // Pick one item randomly or based on a specific criteria
      const selectedItem = items[Math.floor(Math.random() * items.length)];
      filteredDishes.push(selectedItem);
    }
  });

  return filteredDishes;
});
</script>
