<template>
  <div class="  min-h-screen">
    <!-- Main section -->
    <main class="">
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
            <router-link to="/menu"
              class="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-900">
              Browse Menu
            </router-link>
          </div>
        </div>
      </section>
      <!-- Menu section -->
      <section class="w-full py-12 md:py-24 lg:py-32 bg-yellow-50" id="menu">
        <div class="container px-4 md:px-6">
          <div class="space-y-6">
            <div class="space-y-2 text-center">
              <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Menu</h2>
              <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Explore our delectable selection of Australian-inspired dishes.
              </p>
            </div>
            <!-- Dishes grid -->
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <!-- Display dishes -->
              <div v-for="dish in dishes" :key="dish.id" class="rounded-lg bg-white shadow">
                <img :alt="dish.name" class="h-[300px] w-full rounded-t-lg object-cover" :src="dish.image" />
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
        <div class="container mx-auto px-4 md:px-6">
          <div class="grid items-center gap-12 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_550px]">
            <div class="space-y-6">
              <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Reserve a Seat
              </h2>
              <p class="max-w-[600px] md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
                Book your table at Relaxing Koala today. We'll have it ready for you.
              </p>
            </div>
            <!-- Reservation form -->
            <form @submit.prevent="validateReservation">
              <div class="bg-white p-6 space-y-6">
                <div class="space-y-2">
                  <label for="date" class="block font-medium text-sm">Date</label>
                  <InputText id="date" type="date" v-model="reservation.date"
                    class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700" />
                </div>
                <div class="space-y-2">
                  <label for="time" class="block font-medium text-sm">Time</label>
                  <InputText id="time" type="time" v-model="reservation.time"
                    class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700" />
                </div>
                <div class="space-y-2">
                  <label for="party" class="block font-medium text-sm">Party Size</label>
                  <InputText id="party" type="number" min="1" max="10" v-model="reservation.partySize"
                    class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <Button type="submit" label="Reserve Table"
                  class="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
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
  const today = new Date().toISOString().split('T')[0];
  if (reservation.value.date === today) {
    alert('The reservation date cannot be today.');
    return;
  }
  if (reservation.value.partySize > 10) {
    alert('The party size cannot exceed 10.');
    return;
  }
  submitReservation();
}

async function submitReservation() {
  try {
    await addDoc(collection(db, 'reservations'), reservation.value);
    alert('Reservation successful!');
  } catch (error) {
    console.error('Error saving reservation: ', error);
    alert('Error saving reservation.');
  }
}

const dishes = computed(() => {
  const menuItems = store.state.menu.menuItems;
  const filteredDishes = [];

  ['Appetizers', 'Mains', 'Desserts', 'Drinks'].forEach(category => {
    const items = menuItems.filter(item => item.category === category);
    if (items.length > 0) {
      const selectedItem = items[Math.floor(Math.random() * items.length)];
      filteredDishes.push(selectedItem);
    }
  });

  return filteredDishes;
});
</script>
