import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import accountReducer from './slices/accountSlice';
import recipesReducer from './slices/recipesSlice';
import AuthService from '../services/AuthService';
import RecipeService from '../services/RecipeService';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import UserService from '../services/UserService';

const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000/';

const recipeService = new RecipeService(baseURL);
const authService = new AuthService(baseURL);
const userService = new UserService(baseURL);


const rootReducer = combineReducers({
  account: accountReducer,
  recipes: recipesReducer,
});


const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { recipeService, authService, userService },
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export { store, recipeService, authService, userService };
export default store;


