import { combineReducers, configureStore } from '@reduxjs/toolkit';
import accountReducer from './slices/accountSlice';
import recipesReducer from './slices/recipesSlice';
import AuthService from '../services/AuthService';
import RecipeService from '../services/RecipeService';
import { thunkErrorWrapper } from './utils/thunkErrorWrapper';

const recipeService = new RecipeService(process.env.BASE_URL);
const authService = new AuthService(process.env.BASE_URL);

const rootReducer = combineReducers({
  account: accountReducer,
  recipes: recipesReducer,
});


const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { recipeService, authService, thunkErrorWrapper },
      },
    }),
});

export { store, recipeService, authService };
