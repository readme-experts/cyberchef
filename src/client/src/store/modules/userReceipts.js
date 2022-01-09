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
    addNewReceipt(state, payload) {
      state.userReceipts.push(payload.receipt);
    },
  },
  actions: {
    async loadUserReceipts({ commit }) {
      const result = await axios
        .get('/api/user/myrecipes')
        .catch((e) => console.log(e));
      commit('updateUserReceipts', [...result.data]);
    },
    async newReceipts({ commit }, receipt) {
      axios
        .post('/api/user/recipes', receipt)
        .then(commit('addNewReceipt', receipt))
        .catch((err) => console.log(err));
      commit('addNewReceipt', receipt);
    },
  },
};
