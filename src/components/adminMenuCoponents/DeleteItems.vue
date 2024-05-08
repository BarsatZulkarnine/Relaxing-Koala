<template>
    <div>
      <h2>Delete Unit</h2>
      <form @submit.prevent="deleteUnit">
        <div class="form-group">
          <label for="unitSelect">Select Unit to Delete:</label>
          <select id="unitSelect" v-model="selectedUnitIndex" required>
            <option disabled value="">Please select a unit</option>
            <option v-for="(unit, index) in units" :key="unit.code" :value="index">
              {{ unit.code }} - {{ unit.desc }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn">Delete</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { doc, deleteDoc } from 'firebase/firestore';
  import { db } from '../../firebase';
  
  const props = defineProps({
    units: Array
  });
  
  const selectedUnitIndex = ref('');
  
  const deleteUnit = async () => {
    if (selectedUnitIndex.value !== '') {
      const unitId = props.units[selectedUnitIndex.value].id;
      const unitRef = doc(db, 'units', unitId);
  
      const confirmed = confirm(`Are you sure you want to delete ${props.units[selectedUnitIndex.value].desc}?`);
      if (confirmed) {
        try {
          await deleteDoc(unitRef);
          alert('Unit deleted successfully!');
        } catch (error) {
          console.error('Error deleting unit:', error);
          alert('An error occurred while deleting the unit. Please try again.');
        }
      }
    }
  };
  </script>
  
  