import axios from 'axios';

export default {
  state: {
    userReceipts: [],
  },
  getters: {
    userReceipts: (state) => [...state.userReceipts],
    userReceiptById: (state) => (id) =>
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
      const recipeId = receipt.id;
      axios
        .post('/api/user/recipes', { recipeId })
        .then(() => {
          commit('addNewReceipt', receipt);
          alert('Added recipe!');
        })
        .catch((err) => console.log(err));
    },
  },
};
