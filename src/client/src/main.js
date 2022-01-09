import Vue from 'vue';
import App from './App.vue';
import './assets/styles.css';
import router from './router';
import store from './store';
import VueHTTP from './plugins/http';

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  VueHTTP,
  render: (h) => h(App),
}).$mount('#app');

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
if (token && user) {
  app.$http.defaults.headers.common.authorization = token;
  const res = JSON.parse(user);
  app.$store.commit('auth_success', { token, res });
}
