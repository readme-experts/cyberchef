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
    async loadReceipts({ commit }, name) {
      const result = await axios({
        url: '/api/recipes',
        data: { name },
        method: 'GET',
      }).catch((e) => console.log(e));
      commit('updateReceipts', [...result.data]);
    },
  },
};
