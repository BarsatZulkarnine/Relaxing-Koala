<template>
  <div class="container mx-auto px-4 py-8 md:px-6 md:py-12">
    <h1 class="text-2xl font-bold mb-4">Reservations</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else class="border rounded-lg overflow-hidden">
      <div class="bg-gray-100 px-4 py-3 font-medium">
        Reservation Data
      </div>
      <div class="divide-y">
        <div v-for="reservation in reservations" :key="reservation.id" class="grid grid-cols-[1fr_1fr_1fr_80px] items-center px-4 py-3">
          <div>
            <h3 class="font-serif font-medium">{{ reservation.fullName }}</h3>
            <p class="font-serif text-gray-500 text-sm">
              {{ reservation.email }}
            </p>
          </div>
          <div class="font-serif text-right">
            <p class="font-serif text-gray-500 text-sm">Date: {{ formatDate(reservation.date) }}</p>
            <p class="font-serif text-gray-500 text-sm">Time: {{ reservation.time }}</p>
          </div>
          <div class="font-serif text-right">
            <p class="font-serif text-gray-500 text-sm">Party Size: {{ reservation.partySize }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "../firebase";
import { useStore } from "vuex";
import { collection, getDocs } from "firebase/firestore";

const store = useStore();
const reservations = ref([]);
const loading = ref(true);

onMounted(async () => {
  const userData = store.getters.userData;

  try {
    const querySnapshot = await getDocs(collection(db, "reservations"));
    reservations.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    loading.value = false;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    loading.value = false;
  }
});

const formatDate = (date) => {
  let dateObj;
  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else if (date && date.toDate) {
    dateObj = date.toDate();
  } else {
    return date;
  }
  return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  });
};
</script>

<style scoped>
.font-serif {
  font-family: serif;
}
</style>
