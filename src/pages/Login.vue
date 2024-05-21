<template>
  <div class="flex items-center justify-center min-h-screen bg-coffee">
    <div class="p-8 max-w-md w-full bg-white shadow-md rounded-md">
      <h2 class="mb-8 text-center text-3xl font-extrabold text-gray-900">
        Sign In
      </h2>
      <form @submit.prevent="signIn">
        <div class="mb-6">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input id="email" type="email" required v-model="email"
            class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md">
        </div>
        <div class="mb-8">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input id="password" type="password" required v-model="password"
            class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md">
        </div>
        <div>
          <button type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Sign In
          </button>
        </div>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
        Don't have an account? <router-link to="/signup"
          class="font-bold text-black hover:text-gray-900 font-bold sm:text-md">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const email = ref('');
const password = ref('');
const router = useRouter();
const store = useStore();

const signIn = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'Users'));
    const users = usersSnapshot.docs.map(doc => doc.data());
    const user = users.find(u => u.email === email.value && u.password === password.value);

    if (!user) {
      alert('Invalid email or password. Please try again.');
      return;
    }

    store.dispatch('signIn', { status: true, userData: user });

    console.log('Signed in successfully');
    router.push('/');
  } catch (error) {
    console.error('Error signing in:', error);
    alert('Failed to sign in. Please try again later.');
  }
};

</script>

<style>
.bg-coffee {
  background: linear-gradient(135deg, #3e2c29 30%, #5c3c2e 60%, #bea47e);
}
</style>
