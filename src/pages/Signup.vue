<template>
    <div class="flex items-center justify-center min-h-screen bg-coffee">
        <div class="p-6 max-w-lg w-full bg-white shadow-md rounded-md">
            <h2 class="mb-6 text-center text-4xl font-extrabold text-gray-900"> <!-- Increased text size -->
                Sign Up
            </h2>
            <form @submit.prevent="handleSignUp">
                <div class="mb-4">
                    <label for="firstName" class="block text-lg font-medium text-gray-700">First Name</label> <!-- Increased label size -->
                    <input id="firstName" type="text" required v-model="firstName" 
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md">
                </div>
                <div class="mb-4">
                    <label for="lastName" class="block text-lg font-medium text-gray-700">Last Name</label> <!-- Increased label size -->
                    <input id="lastName" type="text" required v-model="lastName"
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md">
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-lg font-medium text-gray-700">Email</label> <!-- Increased label size -->
                    <input id="email" type="email" required v-model="email"
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md">
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-lg font-medium text-gray-700">Password</label>
                    <input id="password" type="password" required v-model="password"
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md">
                </div>
                <div class="mb-6">
                    <label for="confirm-password" class="block text-lg font-medium text-gray-700">Confirm Password</label>
                    <input id="confirm-password" type="password" required v-model="confirmPassword"
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md">
                </div>
                <div>
                    <button type="submit"
                            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                        Sign Up
                    </button>
                </div>
            </form>
            <p class="mt-4 text-center text-md text-gray-600">
                Already have an account? <router-link to="/login" class="font-medium text-black hover:text-gray-900">Sign In</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '../firebase'; // Correct import path for db
import { addDoc, collection } from 'firebase/firestore';


const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');
const confirmPassword = ref('');
const router = useRouter();

const handleSignUp = async () => {
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!");
        return;
    }

    const passwordValidationRegex = /^(?=.*\d)(?=.*[^A-Za-z0-9])(?!.*\s).{8,}$/;
    if (!passwordValidationRegex.test(password.value)) {
        alert("Password must be at least 8 characters long, include at least one number, and one unique character.");
        return;
    }

    try {
        // Generate a new user ID or use a unique identifier like a timestamp or UUID
        const uid = Date.now();  // Simple example using a timestamp

        // Add user to Firestore
        await addDoc(collection(db, 'Users'), {
    uid,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    admin: false
});

        router.push('/login');  // Redirect after successful sign-up
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Failed to create account.");
    }
};
</script>

<style scoped>
.bg-coffee {
    background: linear-gradient(135deg, #3e2c29 30%, #5c3c2e 60%, #bea47e);
}
</style>
