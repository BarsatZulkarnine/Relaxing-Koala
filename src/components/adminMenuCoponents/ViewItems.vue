<template>
  <div>
    <h2>Menu Items</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="menuItem in paginatedItems" :key="menuItem.id">
          <td>{{ menuItem.category }}</td>
          <td>{{ menuItem.name }}</td>
          <td>{{ menuItem.description }}</td>
          <td>{{ menuItem.price }}</td>
          <td>
            <img :src="menuItem.image" alt="Menu Item" style="max-width: 100px; max-height: 100px;">
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

const menuItems = ref([]);
const currentPage = ref(1);
const itemsPerPage = 8;

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'menuItems'));
  menuItems.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

const totalPages = computed(() => Math.ceil(menuItems.value.length / itemsPerPage));

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return menuItems.value.slice(start, end);
});

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
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 8px;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f2f2f2;
  font-weight: bold;
  text-align: left;
}

.table img {
  display: block;
  margin: 0 auto;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: #f2f2f2;
  cursor: pointer;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
