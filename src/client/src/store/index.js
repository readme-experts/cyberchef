import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, payload) {
      state.status = 'success';
      state.token = payload.token;
      state.user = JSON.parse(localStorage.getItem('user')) || payload.user;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.user = '{}';
    },
  },
  actions: {
    async login({ commit }, user) {
      commit('auth_request');
      try {
        const r = await axios({
          url: '/auth/login',
          data: user,
          method: 'POST',
        });
        const token = r.data.token;
        const responseUser = r.data.user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(responseUser));
        axios.defaults.headers.common.usertoken = token;
        commit('auth_success', { token, responseUser });
        return r;
      } catch (err) {
        commit('auth_error');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw err;
      }
    },
    async register({ commit }, user) {
      commit('auth_request');
      return await axios({
        url: '/auth/registration',
        data: user,
        method: 'POST',
      }).catch(() => alert('Something went wrong, please try again'));
    },
    async logout({ commit }) {
      commit('logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return delete axios.defaults.headers.authorization;
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    user: (state) => state.user,
  },
});
