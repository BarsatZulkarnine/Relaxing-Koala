<template>
  <div class="menu-item-form">
    <form @submit.prevent="handleSubmit" class="form-grid">
      <div class="form-group">
        <label for="name" class="form-label text-base">Name</label>
        <Dropdown v-model="selectedItem" :options="menuItems" optionLabel="name" placeholder="Select a menu item" />
      </div>
      <button type="submit" class="btn btn-primary">Delete</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import Dropdown from 'primevue/dropdown';

const selectedItem = ref(null);
const menuItems = ref([]);

async function fetchMenuItems() {
  const querySnapshot = await getDocs(collection(db, 'menuItems'));
  menuItems.value = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
}

async function handleSubmit() {
  try {
    const docRef = doc(collection(db, 'menuItems'), selectedItem.value.id);
    await deleteDoc(docRef);
    alert("Item deleted successfully!");
    // Refresh the menu items
    fetchMenuItems();
  } catch (e) {
    console.error("Error deleting document: ", e);
    alert("Error processing your request.");
  }
}

onMounted(() => {
  fetchMenuItems();
});
</script>
