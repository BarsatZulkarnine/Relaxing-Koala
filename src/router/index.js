import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/Login.vue';
import SignUp from '@/pages/Signup.vue';
import Home from '@/pages/Home.vue';
import MenuItem from '@/pages/MenuItem.vue';
import Menu from '@/pages/Menu.vue';
import Admin from '@/pages/Admin.vue';
import store from '../store/index'; 
import Cart from '@/pages/Cart.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { showNav: true }  
    },
    {
      path: '/signin',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signUp',
      component: SignUp
    },
    {
      path:'/menuItem/:itemId',
      name: 'menuItem',
      component: MenuItem,
      meta: { showNav: true }
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu,
      meta: { showNav: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { requiresAdmin: true } // Add a meta field to indicate that this route requires admin access
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: { showNav: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (store.state.userData.admin === true) {
      next(); 
    } else {
      next({ name: 'home' }); 
    }
  } else {
    next(); 
  }
});

export default router;
