import axios from 'axios';

export default {
  install: function (Vue) {
    Vue.prototype.$http = axios;
  },
};
