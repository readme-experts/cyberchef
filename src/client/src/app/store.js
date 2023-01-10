import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    recipes: recipesReducer,
  },
});
