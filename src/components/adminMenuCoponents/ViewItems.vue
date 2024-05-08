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
        <tr v-for="menuItem in menuItems" :key="menuItem.id">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

const menuItems = ref([]);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'menuItems'));
  menuItems.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
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
</style>
