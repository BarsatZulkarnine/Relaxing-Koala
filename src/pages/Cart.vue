<template>
  <div class="container mx-auto px-4 py-8 md:px-6 md:py-12">
    <div class="grid gap-8 md:grid-cols-2">
      <div>
        <h1 class="text-2xl font-bold mb-4">Your Cart</h1>
        <div class="border rounded-lg overflow-hidden">
          <div class="bg-gray-100 dark:bg-gray-800 px-4 py-3 font-medium">Items</div>
          <div class="divide-y dark:divide-gray-700">
            <div v-for="item in cartItems" :key="item.id" class="grid grid-cols-[1fr_80px_80px] items-center px-4 py-3">
              <div>
                <h3 class="font-medium">{{ item.name }}</h3>
                <p class="text-gray-500 dark:text-gray-400 text-sm">{{ item.description }}</p>
              </div>
              <div class="text-right">{{ item.quantity }}</div>
              <div class="text-right font-medium">{{ item.price }}</div>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex justify-between items-center">
            <h3 class="font-medium">Total</h3>
            <div class="font-medium">${{ total }}</div>
          </div>
        </div>
      </div>
      <div>
        <h2 class="text-2xl font-bold mb-4">Checkout</h2>
        <form class="space-y-4" @submit.prevent="checkout">
          <div>
              <label class="block mb-1 font-medium" for="name">
                Full Name
              </label>
              <input
                class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                id="name"
                placeholder="Enter your full name"
                type="text"
              />
          </div>
            <div>
              <label class="block mb-1 font-medium" for="phone">
                Phone Number
              </label>
              <input
                class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                id="phone"
                placeholder="Enter your phone number"
                type="tel"
              />
            </div>
            <div>
              <label class="block mb-1 font-medium" for="address">
                Address
              </label>
              <textarea
                class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                id="address"
                placeholder="Enter your delivery address"
                rows="3"
              ></textarea>
            </div>
          <div class="flex justify-end">
              <Button
                class="btn border-t-zinc-600 hover:bg-primary-600 text-black font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                type="submit"
              >
                Confirm Checkout
              </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Button from 'primevue/button';

const store = useStore();

const cartItems = computed(() => store.state.cart.cartItems);

const total = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + (item.quantity * item.price), 0);
});

const checkout = () => {
  // Implement your checkout logic here
};

</script>

  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  