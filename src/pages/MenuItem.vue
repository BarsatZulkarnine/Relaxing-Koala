<template>
  <div>
    <main class="py-12 px-6">
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img
            :alt="item.name"
            :src="item.image"
            class="rounded-lg object-cover w-full h-auto"
            style="aspect-ratio: 600/400; object-fit: cover;"
            height="400"
            width="600"
          />
        </div>
        <div class="space-y-6">
          <h1 class="text-3xl font-bold">{{ item.name }}</h1>
          <p class="text-gray-700">{{ item.description }}</p>
          <div class="flex items-center justify-between">
            <span class="text-2xl font-bold">{{ item.price  }}</span>
          </div>
          <div class="flex flex-auto grid-cols-2 gap-6 mt-6">
            <div>
              <h3 class="text-lg font-bold">Ingredients</h3>
              <ul class="space-y-2 text-gray-600">
                <li>Beef patty</li>
                <li>Lettuce</li>
                <li>Tomato</li>
                <li>Onion</li>
                <li>Secret sauce</li>
                <li>Bun</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-bold">Nutrition</h3>
              <ul class="space-y-2 text-gray-600">
                <li>Calories: 650</li>
                <li>Fat: 35g</li>
                <li>Carbs: 50g</li>
                <li>Protein: 30g</li>
              </ul>
            </div>
          </div>
          <Button label="Add to Cart" class="p-button-primary bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded
          " @click="addToCart" />
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Button from 'primevue/button';
import Footer from '@/components/Footer.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

// Access menuItems from the Vuex store
const menuItems = computed(() => store.state.menu.menuItems);

const item = computed(() => {
  const itemId = route.params.itemId.toString();
  return menuItems.value.find(item => item.id === itemId);
});

const addToCart = () => {
  store.commit('cart/addToCart', item.value); // Assuming you have a mutation in your store to add items to the cart
  console.log(store.state.cart.cartItems);
  //router.push('/cart'); // Redirect to the cart page
};

if (!item.value) {
  console.error('Item not found');
}
</script>



<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
