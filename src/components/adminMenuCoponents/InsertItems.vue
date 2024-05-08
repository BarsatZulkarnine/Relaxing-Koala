<template>
  <div class="menu-item-form">
    <form @submit.prevent="handleSubmit" class="form-grid">
      <div class="form-group">
        <label for="category" class="form-label text-base">Category</label>
        <Dropdown v-model="formData.category" :options="categories" optionLabel="name" placeholder="Select a category" />
      </div>
      <div class="form-group">
        <label for="id" class="form-label text-base">ID</label>
        <input type="number" class="form-control" id="id" v-model="formData.id" required>
      </div>
      <div class="form-group">
        <label for="name" class="form-label text-base">Name</label>
        <input type="text" class="form-control" id="name" v-model="formData.name" required>
      </div>
      <div class="form-group">
        <label for="description" class="form-label text-base">Description</label>
        <textarea class="form-control" id="description" v-model="formData.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="price" class="form-label text-base">Price</label>
        <input type="text" class="form-control" id="price" v-model="formData.price" required>
      </div>
      <div class="form-group">
        <label for="image" class="form-label text-base">Image</label>
        <input type="file" class="form-control" id="image" @change="handleFileChange" required>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup>


import { ref } from 'vue';
import { db, storage } from '@/firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import Dropdown from 'primevue/dropdown';
const formData = ref({
  id: null,
  category: null,
  name: '',
  description: '',
  price: '',
  image: null
});

const categories = [{ name: 'Appetizers' }, { name: 'Mains' }, { name: 'Desserts' }, { name: 'Drinks' }];

function handleFileChange(event) {
  formData.value.image = event.target.files[0];
}

async function handleSubmit() {
  if (!formData.value.image) {
    alert("Please upload an image.");
    return;
  }

  const imageRef = storageRef(storage, `menuItems/${formData.value.image.name}`);
  try {
    // Upload the file and metadata
    const snapshot = await uploadBytes(imageRef, formData.value.image);
    const imageUrl = await getDownloadURL(snapshot.ref);

    // Add data to Firestore
    const docRef = await addDoc(collection(db, 'menuItems'), {
      id: formData.value.category.id.toString(),
      category: formData.value.category.name,
      name: formData.value.name,
      description: formData.value.description,
      price: formData.value.price,
      image: imageUrl
    });

    // Clear the form or give feedback
    console.log("Document written with ID: ", docRef.id);
    alert("Item added successfully!");
    formData.value = { category: '', name: '', description: '', price: '', image: null };
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Error processing your request.");
  }
}
</script>

<style scoped>
.menu-item-form {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 10px;
}

.form-label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>