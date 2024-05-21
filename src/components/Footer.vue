<template>
  <footer class="bg-lime-50 py-6 w-full text-sm">
    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      <div class="grid gap-1 text-left ">
        <h3 class="font-semibold">Relaxing Koala</h3>
        <p>123 Wallaby Way, Sydney NSW 2000</p>
        <p>Open daily 7am - 10pm</p>
      </div>
      <div class="grid gap-1 text-left">
        <h3 class="font-semibold">Connect</h3>
        <router-link class="flex items-center gap-2" to="/instagram">
          <InstagramIcon class="h-5 w-5" />
          Instagram
        </router-link>
        <router-link class="flex items-center gap-2" to="/twitter">
          <TwitterIcon class="h-5 w-5" />
          Twitter
        </router-link>
        <router-link class="flex items-center gap-2" to="/facebook">
          <FacebookIcon class="h-5 w-5" />
          Facebook
        </router-link>
      </div>
      <div class="grid gap-1 text-left">
        <h3 class="font-semibold">Menu</h3>
        <router-link to="/">Breakfast</router-link>
        <router-link to="/">Lunch</router-link>
        <router-link to="/">Dinner</router-link>
        <router-link to="/">Desserts</router-link>
      </div>
      <div class="grid gap-1 text-left">
        <h3 class="font-semibold">Info</h3>
        <router-link to="/">Reserve a Seat</router-link>
        <router-link to="/">Contact Us</router-link>
        <router-link to="/">Gift Cards</router-link>
        <router-link to="/">Careers</router-link>
      </div>
    </div>
  </footer>
</template>