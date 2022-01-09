import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login';
import UserPage from '@/views/UserPage';
import AllReceipts from '@/views/AllReceipts';
import Receipt from '@/views/Receipt';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Login,
  },
  {
    path: '/user/:id',
    name: 'User',
    component: UserPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/receipts',
    name: 'AllReceipts',
    component: AllReceipts,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/receipts/:id',
    name: 'Receipt',
    component: Receipt,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
