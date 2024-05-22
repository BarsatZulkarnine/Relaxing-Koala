<template>
    <div>
      <section class="w-full py-12 md:py-24 lg:py-32 bg-[#e5e5d3]">
        <div class="container px-4 md:px-6 text-center">
          <div class="space-y-4">
            <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Relaxing Koala
            </h1>
            <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Discover the tranquil charm of our koala-themed cafe, where the sights and sounds of nature create a serene dining experience.
            </p>
          </div>
        </div>
      </section>
  
      <section class="w-full py-12 md:py-24 lg:py-32">
      <div class="container px-4 md:px-6">
        <div class="grid gap-12">
          <div v-for="review in reviews" :key="review.id" class="flex gap-4 items-start">
            <Avatar :label="getFirstLetter(review.name)" class="p-5" size="large" shape="circle" />
            <div class="grid gap-2">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-semibold">{{ review.name }}</h3>
                  <time class="text-sm text-gray-500">{{ review.time }}</time>
                </div>
                <Rating v-model="review.rating" readonly :cancel="false" class="ml-auto" />
              </div>
              <p class="text-sm leading-loose text-gray-500">
                {{ review.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  
      <section class="w-full py-12 md:py-24 lg:py-32 bg-[#f0f0f0]">
        <div class="container px-4 md:px-6">
          <div class="mx-auto w-full max-w-md space-y-6">
            <div class="space-y-2 text-center">
              <h2 class="text-3xl font-bold">Leave a Review</h2>
              <p class="text-gray-500">Share your experience at Koala Cove Cafe.</p>
            </div>
            <form @submit.prevent="submitReview" class="space-y-4">
              <div class="space-y-2">
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <input v-model="name" type="text" id="name" placeholder="Enter your name" required class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div class="space-y-2">
                <label for="rating" class="block text-sm font-medium text-gray-700">Rating</label>
                <Rating v-model="rating" :cancel="false" required />
              </div>
              <div class="space-y-2">
                <label for="review" class="block text-sm font-medium text-gray-700">Review</label>
                <textarea v-model="text" id="review" placeholder="Share your thoughts" required class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              </div>
              <button type="submit" class="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
  import { db } from "@/firebase";
  import Avatar from 'primevue/avatar';
  import Rating from 'primevue/rating';
  
  const name = ref("");
  const rating = ref(5);
  const text = ref("");
  const reviews = ref([]);

  const getFirstLetter = (name) => {
  return name.charAt(0).toUpperCase();
};
  const submitReview = async () => {
    try {
      await addDoc(collection(db, "reviews"), {
        name: name.value,
        rating: rating.value,
        text: text.value,
        time: Timestamp.fromDate(new Date()).toDate().toLocaleString(),
      });
      name.value = "";
      rating.value = 5;
      text.value = "";
      fetchReviews();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  
  const fetchReviews = async () => {
    const querySnapshot = await getDocs(collection(db, "reviews"));
    reviews.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
  
  onMounted(() => {
    fetchReviews();
  });
  </script>
  
