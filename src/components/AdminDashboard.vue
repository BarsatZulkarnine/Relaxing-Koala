<template>
  <header class="app-header">
    <router-link class="lg:hidden" to="#">
      <font-awesome-icon icon="utensils" class="h-6 w-6" />
      <span class="sr-only">Home</span>
    </router-link>
    <div class="flex-1">
      <h1 class="font-semibold text-lg">Dashboard</h1>
    </div>

  </header>
  <main class="main-content">
    <div class="data-container">
      <div class="data-card">
        <h2 class="data-title">Total Orders</h2>
        <p class="data-value">153 Orders</p>
        <span class="data-change">+12% from last month</span>
      </div>
      <div class="data-card">
        <h2 class="data-title">Total Revenue</h2>
        <p class="data-value">$18,230.00</p>
        <span class="data-change">+9% from last month</span>
      </div>
      <div class="data-card">
        <h2 class="data-title">Customer Feedback</h2>
        <p class="data-value">88% Positive</p>
        <span class="feedback-detail">Based on 120 reviews</span>
      </div>
      <div class="data-card">
        <h2 class="data-title">New Sign Ups</h2>
        <p class="data-value">47 New Users</p>
        <span class="data-change">+20% from last month</span>
      </div>
    </div>
  </main>

</template>



<style scoped>
.app-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 16px;

  background-color: lightgrey;
}

.data-card {
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.data-title {
  font-size: 24px;
}

.data-value {
  margin-top: 4px;
  font-size: 28px;
  font-weight: bold;
}
</style>