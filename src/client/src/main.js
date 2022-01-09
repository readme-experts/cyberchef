import Vue from 'vue';
import App from './App.vue';
import './assets/styles.css';
import router from './router';
import store from './store';
import VueHTTP from './plugins/http';

Vue.config.productionTip = false;
Vue.use(VueHTTP);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
