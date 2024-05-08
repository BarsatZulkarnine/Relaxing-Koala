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
.app-container {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #ccc;
  background-color: #f0f0f0;
}

.search-and-user {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

.search-container {
  position: relative;
  flex-grow: 1;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 1/2;
  transform: translateY(-50%);
}

.search-input {
  padding-left: 2.5rem;
  width: 100%;
}

.main-content {
  flex-grow: 1;
  padding: 1rem;
}

.data-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.data-card {
  padding: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.data-title {
  font-size: 1.2rem;
  color: #333;
}

.data-value {
  margin-top: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.data-change,
.feedback-detail {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #666;
}
</style>