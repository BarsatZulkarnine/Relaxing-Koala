<template>
  <div class="container mx-auto px-4 py-8 md:px-6 md:py-12">
    <h1 class="text-2xl font-bold mb-4">Orders</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else class="border rounded-lg overflow-hidden">
      <div class="bg-gray-100 dark:bg-gray-800 px-4 py-3 font-medium">
        Order Data
      </div>
      <div class="divide-y dark:divide-gray-700">
        <div v-for="order in orders" :key="order.id" class="grid grid-cols-[1fr_80px_80px] items-center px-4 py-3">
          <div>
            <h3 class="font-serif font-medium">{{ order.fullName }}</h3>
            <p class="font-serif text-gray-500 dark:text-gray-400 text-sm">
              {{ order.address }}
            </p>
          </div>
          <div class="font-serif text-right">
            <ul>
              <li v-for="item in order.items" :key="item.id">
                {{ item.name }} (Quantity: {{ item.quantity }})
              </li>
            </ul>
          </div>
          <div class="font-serif text-right font-medium">{{ order.total }}</div>
          <div class="font-serif text-right font-medium">{{ formatDate(order.date.toDate()) }}</div>
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
const orders = ref([]);
const loading = ref(true);

onMounted(async () => {
  const userData = store.getters.userData;

  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    orders.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    loading.value = false;
  } catch (error) {
    console.error("Error fetching orders:", error);
    loading.value = false;
  }
});

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false });
};
</script>

<style scoped>
.font-serif {
  font-family: serif;
}
</style>