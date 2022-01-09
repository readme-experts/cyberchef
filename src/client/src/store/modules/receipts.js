import axios from 'axios';

export default {
  state: {
    receipts: [],
  },
  getters: {
    receipts: (state) => [...state.receipts],
    receiptById: (state) => (id) =>
      state.receipts.find((receipt) => receipt.id === id),
  },
  mutations: {
    updateReceipts(state, payload) {
      state.receipts = [...payload.data];
    },
  },
  actions: {
    async loadReceipts({ commit }, recipeName) {
      const result = await axios
        .post('/receipts', { recipeName })
        .catch((e) => console.log(e));
      commit('updateReceipts', [...result.data]);
    },
  },
};
