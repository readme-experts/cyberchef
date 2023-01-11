import { combineReducers, configureStore } from '@reduxjs/toolkit';
import accountReducer from './slices/accountSlice';
import recipesReducer from './slices/recipesSlice';

const rootReducer = combineReducers({
  account: accountReducer,
  recipes: recipesReducer,
});


export const store = configureStore({
  reducer: rootReducer,
});
