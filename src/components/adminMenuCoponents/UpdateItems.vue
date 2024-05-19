<template>
  <div class="menu-item-form">
    <form @submit.prevent="handleSubmit" class="form-grid">
      <div class="form-group">
        <label for="name" class="form-label text-base">Name</label>
        <Dropdown v-model="selectedItem" :options="menuItems" optionLabel="name" placeholder="Select a menu item" @change="fetchMenuItem" />
      </div>
      <div class="form-group">
        <label for="category" class="form-label text-base">Category</label>
        <Dropdown v-model="formData.category" :options="categories" optionLabel="name" placeholder="Select a category" />
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
        <input type="file" class="form-control" id="image" @change="handleFileChange">
      </div>
      <button type="submit" class="btn btn-primary">Update</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db, storage } from '@/firebase';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import Dropdown from 'primevue/dropdown';

const selectedItem = ref(null);
const formData = ref({
  id: null,
  category: null,
  name: '',
  description: '',
  price: '',
  image: null,
  imageUrl: ''
});
const categories = [{ name: 'Appetizers' }, { name: 'Mains' }, { name: 'Desserts' }, { name: 'Drinks' }];
const menuItems = ref([]);

async function fetchMenuItems() {
  const querySnapshot = await getDocs(collection(db, 'menuItems'));
  menuItems.value = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
}

async function fetchMenuItem() {
  if (selectedItem.value) {
    const docRef = doc(collection(db, 'menuItems'), selectedItem.value.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      formData.value = { ...data, id: selectedItem.value.id, category: categories.find(cat => cat.name === data.category) };
    } else {
      alert("No such document!");
    }
  }
}

function handleFileChange(event) {
  formData.value.image = event.target.files[0];
}

async function handleSubmit() {
  try {
    const docRef = doc(collection(db, 'menuItems'), formData.value.id);
    let imageUrl = formData.value.imageUrl;
    if (formData.value.image) {
      const imageRef = storageRef(storage, `menuItems/${formData.value.image.name}`);
      const snapshot = await uploadBytes(imageRef, formData.value.image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }
    await updateDoc(docRef, {
      category: formData.value.category.name,
      name: formData.value.name,
      description: formData.value.description,
      price: formData.value.price,
      image: imageUrl // Use the new image URL if uploaded, otherwise keep the existing one
    });
    alert("Item updated successfully!");
  } catch (e) {
    console.error("Error updating document: ", e);
    alert("Error processing your request.");
  }
}

onMounted(() => {
  fetchMenuItems();
});
</script>
