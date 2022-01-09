import axios from 'axios';

export default {
  state: {
    userReceipts: [],
  },
  getters: {
    receipts: (state) => [...state.userReceipts],
    recieptById: (state) => (id) =>
      state.userReceipts.find((receipt) => receipt.id === id),
  },
  mutations: {
    updateUserReceipts(state, payload) {
      state.userReceipts = [...payload.data];
    },
  },
  actions: {
    async loadUserReceipts({ commit }) {
      const result = await axios
        .get('/user/myrecipes')
        .catch((e) => console.log(e));
      commit('updateUserReceipts', [...result.data]);
    },
  },
};
