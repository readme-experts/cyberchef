import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import accountReducer from './slices/accountSlice';
import recipesReducer from './slices/recipesSlice';
import AuthService from '../services/AuthService';
import RecipeService from '../services/RecipeService';
import { thunkErrorWrapper } from './utils/thunkErrorWrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

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
export default store;
