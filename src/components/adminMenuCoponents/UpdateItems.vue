<template>
  <div>
    <h2>Menu Items</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Category</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="menuItem in menuItems" :key="menuItem.id">
          <td>{{ menuItem.id }}</td>
          <td>{{ menuItem.category }}</td>
          <td>{{ menuItem.name }}</td>
          <td>{{ menuItem.description }}</td>
          <td>{{ menuItem.price }}</td>
          <td>
            <img :src="menuItem.image" alt="Menu Item" style="max-width: 100px; max-height: 100px;">
          </td>
          <td>
            <button @click="editMenuItem(menuItem)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Update Form Modal -->
    <div v-if="editedItem">
      <h3>Edit Menu Item</h3>
      <div class="form-group">
        <label for="editId">Id</label>
        <input type="text" class="form-control" id="editId" v-model="editedItem.id" />
      </div>
      <div class="form-group">
        <label for="editCategory">Category</label>
        <input type="text" class="form-control" id="editCategory" v-model="editedItem.category" />
      </div>
      <div class="form-group">
        <label for="editName">Name</label>
        <input type="text" class="form-control" id="editName" v-model="editedItem.name" />
      </div>
      <div class="form-group">
        <label for="editDescription">Description</label>
        <textarea class="form-control" id="editDescription" v-model="editedItem.description"></textarea>
      </div>
      <div class="form-group">
        <label for="editPrice">Price</label>
        <input type="number" class="form-control" id="editPrice" v-model="editedItem.price" />
      </div>
      <button @click="updateMenuItem" class="btn btn-primary">Update</button>
      <button @click="cancelUpdate" class="btn btn-secondary">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const menuItems = ref([]);
const showModal = ref(false);
const editedItem = ref(null);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'menuItems'));
  menuItems.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

function editMenuItem(menuItem) {
  editedItem.value = { ...menuItem };
  showModal.value = true;
}

async function updateMenuItem() {
  const menuItemRef = doc(db, 'menuItems', editedItem.value.id);
  await updateDoc(menuItemRef, {
    id: editedItem.value.id,
    category: editedItem.value.category,
    name: editedItem.value.name,
    description: editedItem.value.description,
    price: editedItem.value.price,
  });
  showModal.value = false;
}

function cancelUpdate() {
  showModal.value = false;
}
</script>

<style scoped>
/* Styles for the table and modal can be added here */
</style>
