<template>
  <header v-if="showNavbar" class="px-4 lg:px-6 h-14 flex items-center border-b max-w-screen-lg mx-auto">
    <!-- Logo and Restaurant Name -->
    <router-link to="/" class="flex items-center justify-center">
      <img :src="'https://www.example.com/' + userInitial.toLowerCase() + '.png'" alt="Restaurant Logo" class="h-8 w-auto" />
      <span class="ml-2 text-lg font-semibold">Relaxing Koala</span>
    </router-link>

    <!-- Navigation Links -->
    <nav class="ml-auto flex gap-4 sm:gap-6">
      <router-link class="text-sm font-medium hover:underline underline-offset-4" to="/menu">Menu</router-link>
      <router-link class="text-sm font-medium hover:underline underline-offset-4" to="/cart">Cart</router-link>
      <router-link class="text-sm font-medium hover:underline underline-offset-4" to="/">Contact</router-link>
      
      <!-- Sign In Link -->
      <router-link v-if="!isSignedIn" class="text-sm font-medium hover:underline underline-offset-4" to="/signin">Sign In</router-link>
      
      <!-- User Icon and Dropdown -->
      <div v-if="isSignedIn" class="relative">
        <button @click.stop="toggleDropdown" class="text-sm font-medium hover:underline underline-offset-4 focus:outline-none">
          <div class="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center">{{ userInitial }}</div>
        </button>
        <transition name="fade">
          <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
            <button v-for="option in accountOptions" :key="option.name" @click="option.action" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{{ option.name }}</button>
          </div>
        </transition>
      </div>
    </nav>
  </header>
  <RouterView />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter(); // Add this line to define the router variable
const route = useRoute();
const showNavbar = computed(() => route.meta.showNav);
const isSignedIn = computed(() => store.getters.isSignedIn);
const userData = computed(() => store.getters.userData);
const userInitial = computed(() => userData.value.firstName?.charAt(0) || 'N/A');
const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
  // Corrected to use store.state if direct state access is needed or a getter method
  console.log(store.state.menu.menuItems); // Assuming 'menu' is the namespace
}

// Fetch menu items on component mount
onMounted(() => {
  store.dispatch('menu/fetchMenuItems');
});

const signOut = () => {
  store.dispatch('signOut'); // Dispatch the signOut action
  showDropdown.value = false;
  router.push('/');
}

const accountOptions = computed(() => {
  const isAdmin = store.state.userData.admin === true;
  return [
    { name: 'Sign Out', action: signOut },
    { name: 'Checkout', action: () => router.push('/cart') },
    ...(isAdmin ? [{ name: 'Admin', action: () => router.push('/admin') }] : [])
  ];
});

</script>


<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>