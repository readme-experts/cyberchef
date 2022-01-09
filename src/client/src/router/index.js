import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login';
import UserPage from '@/views/UserPage';
import AllReceipts from '@/views/AllReceipts';
import Receipt from '@/views/Receipt';
import store from '@/store';
import Register from '@/views/Register';

require('dotenv').config();

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
    component: Register,
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
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `CyberChef | ${to.name}`;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/');
  } else {
    next();
  }
});

export default router;
