<template>
  <div>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="form-group">
        <label for="category" class="form-label text-base font-semibold">Category</label>
        <Dropdown v-model="formData.category" :options="categories" optionLabel="name" placeholder="Select a category"
          class="w-full p-2 border rounded-md shadow-sm" />
      </div>
      <div class="form-group">
        <label for="id" class="form-label text-base font-semibold">ID</label>
        <input type="number" class="form-control w-full p-2 border rounded-md shadow-sm" id="id" v-model="formData.id"
          required>
      </div>
      <div class="form-group">
        <label for="name" class="form-label text-base font-semibold">Name</label>
        <input type="text" class="form-control w-full p-2 border rounded-md shadow-sm" id="name" v-model="formData.name"
          required>
      </div>
      <div class="form-group">
        <label for="description" class="form-label text-base font-semibold">Description</label>
        <textarea class="form-control w-full p-2 border rounded-md shadow-sm" id="description"
          v-model="formData.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="price" class="form-label text-base font-semibold">Price</label>
        <input type="text" class="form-control w-full p-2 border rounded-md shadow-sm" id="price"
          v-model="formData.price" required>
      </div>
      <div class="form-group">
        <label for="image" class="form-label text-base font-semibold">Image</label>
        <input type="file" class="form-control w-full p-2 border rounded-md shadow-sm" id="image"
          @change="handleFileChange" required>
      </div>
      <button type="submit" class="py-2 px-4 bg-blue-700 text-white rounded-md">Submit</button>
    </form>
  </div>
</template>

<script setup>


import { ref } from 'vue';
import { db, storage } from '@/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
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

  try {
    const q = query(collection(db, 'menuItems'), where('id', '==', formData.value.id.toString()));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      alert("ID in use. Please use a different ID.");
      return;
    }

    const imageRef = storageRef(storage, `menuItems/${formData.value.image.name}`);

    const snapshot = await uploadBytes(imageRef, formData.value.image);
    console.log("Uploaded a blob or file!", snapshot);
    const imageUrl = await getDownloadURL(snapshot.ref);
    console.log("image url: ", imageUrl);

    const docRef = await addDoc(collection(db, 'menuItems'), {
      id: formData.value.id.toString(),
      category: formData.value.category.name,
      name: formData.value.name,
      description: formData.value.description,
      price: formData.value.price,
      image: imageUrl
    });

    console.log("Document written with ID: ", docRef.id);
    alert("Item added successfully!");
    formData.value = { id: null, category: null, name: '', description: '', price: '', image: null };
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