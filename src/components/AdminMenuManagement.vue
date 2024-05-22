<template>
  <div class="container">
    <nav class="nav--flex">
      <ul class="nav flex nav-tabs space  ">
        <li class="nav-item text-xl font-bold px-2 py-4" @click="setTab('view')">View</li>
        <li class="nav-item text-xl font-bold px-2 py-4" @click="setTab('insert')">Insert</li>
        <li class="nav-item text-xl font-bold px-2 py-4" @click="setTab('update')">Update</li>
        <li class="nav-item text-xl font-bold px-2 py-4" @click="setTab('delete')">Delete</li>
      </ul>
    </nav>
    <div v-if="currentTab === 'view'">
      <ViewItems :units="units" />
    </div>
    <div v-if="currentTab === 'insert'">
      <InsertItems @new-unit="addUnit" />
    </div>
    <div v-if="currentTab === 'update'">
      <UpdateItems :units="units" />
    </div>
    <div v-if="currentTab === 'delete'">
      <DeleteItems :units="units" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DeleteItems from './adminMenuCoponents/DeleteItems.vue';
import InsertItems from './adminMenuCoponents/InsertItems.vue'
import UpdateItems from './adminMenuCoponents/UpdateItems.vue'
import ViewItems from './adminMenuCoponents/ViewItems.vue';

import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';


const router = useRouter();
const currentTab = ref('view');
const units = ref([]);

const addUnit = (newUnit) => {
  units.value.push({ ...newUnit });
};

onMounted(() => {
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'units'));
    units.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
  fetchData().catch(error => console.error('Error fetching units:', error));
});


function setTab(tab) {
  currentTab.value = tab;
}

function logout() {
  router.push('/');
}
</script>

<style scoped>
.nav--flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>