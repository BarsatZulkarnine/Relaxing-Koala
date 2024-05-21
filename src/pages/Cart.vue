<template>
  <div class="container mx-auto px-4 py-8 md:px-6 md:py-12">
    <div class="grid gap-8 md:grid-cols-2">
      <div>
        <h1 class="text-2xl font-bold mb-4">Your Cart</h1>
        <div class="border rounded-lg overflow-hidden">
          <div class="bg-gray-100 px-4 py-3 font-bold">Items</div>
          <div class="divide-y dark:divide-gray-700">
            <div v-for="item in cartItems" :key="item.id" class="grid grid-cols-[1fr_80px_80px] items-center px-4 py-3">
              <div>
                <h3 class="font-bold">{{ item.name }}</h3>
                <p class="text-gray-500 text-sm">{{ item.description }}</p>
              </div>
              <div class="flex items-center">
                <button @click="decrementQuantity(item)" class="text-xl mr-2 font-bold font-serif">-</button>
                <div class="font-serif text-right">{{ item.quantity }}</div>
                <button @click="incrementQuantity(item)" class="text-xl ml-2 font-bold font-serif">+</button>
              </div>
              <div class="text-right font-bold">{{ item.price }}</div>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex justify-between items-center">
            <h3 class=" font-bold">Total</h3>
            <div class="font-bold">${{ total }}</div>
          </div>
        </div>
      </div>
      <div>
        <h2 class="text-2xl font-bold mb-4">Checkout</h2>
        <form class="space-y-4" @submit.prevent="submitCheckout">
          <div>
            <label class="block mb-1 font-medium" for="name">Full Name</label>
            <input class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              id="name" placeholder="Enter your full name" type="text" v-model="fullName" required
              aria-label="Full Name" />
          </div>
          <div>
            <label class="block mb-1 font-medium" for="phone">Phone Number</label>
            <input class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              id="phone" placeholder="Enter your phone number" type="tel" v-model="phoneNumber" required
              aria-label="Phone Number" />
          </div>
          <div>
            <label class="block mb-1 font-medium" for="address">Address</label>
            <textarea class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              id="address" placeholder="Enter your delivery address" rows="3" v-model="address" required
              aria-label="Address"></textarea>
          </div>
          <div class="flex justify-end">
            <button
              class="btn border-t-zinc-600 hover:bg-primary-600 text-black font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              type="submit">
              Confirm Checkout
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { db } from '@/firebase';
import { useStore } from 'vuex';
import { doc, getDoc, updateDoc, collection, addDoc, Timestamp, setDoc } from 'firebase/firestore';

const store = useStore();
const cartItems = ref([]);
const total = ref(0);
const fullName = ref('');
const phoneNumber = ref('');
const address = ref('');
const userData = store.getters.userData;

const incrementQuantity = async (item) => {

  if (userData) {
    const uid = userData.uid.toString();
    const userCartRef = doc(db, 'userCart', uid);

    try {
      const userCartSnapshot = await getDoc(userCartRef);
      if (userCartSnapshot.exists()) {
        const existingCart = userCartSnapshot.data();
        if (existingCart[item.id]) {
          existingCart[item.id].quantity++;
          await updateDoc(userCartRef, existingCart);
          cartItems.value = Object.values(existingCart);
          total.value = cartItems.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }
};

const decrementQuantity = async (item) => {

  if (userData) {
    const uid = userData.uid.toString();
    const userCartRef = doc(db, 'userCart', uid);

    try {
      const userCartSnapshot = await getDoc(userCartRef);
      if (userCartSnapshot.exists()) {
        const existingCart = userCartSnapshot.data();
        if (existingCart[item.id] && existingCart[item.id].quantity > 1) {
          existingCart[item.id].quantity--;
          await updateDoc(userCartRef, existingCart);
          cartItems.value = Object.values(existingCart);
          total.value = cartItems.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }
};

watchEffect(() => {

  if (userData && userData.uid) {
    const uid = userData.uid.toString();
    const userCartRef = doc(db, 'userCart', uid);
    getDoc(userCartRef).then((docSnap) => {
      if (docSnap.exists()) {
        const userCart = docSnap.data();
        cartItems.value = Object.values(userCart);
        total.value = cartItems.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      } else {
        cartItems.value = [];
        total.value = 0;
      }
    }).catch((error) => {
      console.error('Error fetching user cart:', error);
    });
  }
});

const submitCheckout = async () => {
  if (!fullName.value || !phoneNumber.value || !address.value) {
    alert('Please fill all the fields.');
    return;
  }


  if (userData) {
    const uid = userData.uid.toString();

    const userCartRef = doc(db, 'userCart', uid);
    try {
      const userCartSnapshot = await getDoc(userCartRef);
      if (userCartSnapshot.exists()) {
        const existingCart = userCartSnapshot.data();
        const orderRef = collection(db, 'orders');
        await addDoc(orderRef, {
          userId: uid,
          fullName: fullName.value,
          phoneNumber: phoneNumber.value,
          address: address.value,
          items: Object.values(existingCart).map(item => ({ id: item.id, name: item.name, quantity: item.quantity })),
          total: total.value,
          date: Timestamp.fromDate(new Date())
        });
        const userCartRef = doc(db, 'userCart', uid);
        await setDoc(userCartRef, {});

        alert('Order placed successfully!');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  }
};

</script>
