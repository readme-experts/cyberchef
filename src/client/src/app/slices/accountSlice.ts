import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '../actions/account/loginUser';
import { registerUser } from '../actions/account/registerUser';
import { loadFavoriteRecipes } from '../actions/account/loadFavoriteRecipes';
import { addFavoriteRecipe } from '../actions/account/addFavoriteRecipe';
import { deleteFavoriteRecipe } from '../actions/account/deleteFavoriteRecipe';
import { AuthState } from './types/Auth/AuthState';
import { AuthFulfilled } from './types/Auth/AuthFulfilled';

const storageNames = {
  user: 'cyberChefUser',
  token: 'cyberChefToken',
};

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem(storageNames.user) ?? ''),
  token: localStorage.getItem(storageNames.token),
  userRecipes: [],
  loading: false,
  error: null,
};

const isRejectedAction = (action: Action) => action.type.endsWith('rejected');
const isPendingAction = (action: Action) => action.type.endsWith('pending');

const saveUser = (state: AuthState, action: PayloadAction<AuthFulfilled>) => {
  state.loading = false;
  state.user = action.payload.user;
  state.token = action.payload.accessToken;
  localStorage.setItem(storageNames.user, JSON.stringify(state.user));
  localStorage.setItem(storageNames.token, state.token as string);
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout(state: AuthState) {
      state.user = null;
      state.token = null;
      localStorage.removeItem(storageNames.user);
      localStorage.removeItem(storageNames.token);
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      saveUser(state, action);
    });
    builder.addCase(registerUser.fulfilled, (state: AuthState, action) => {
      saveUser(state, action);
    });
    builder.addCase(loadFavoriteRecipes.fulfilled, (state: AuthState, action) => {
      state.userRecipes = action.payload;
    });
    builder.addCase(addFavoriteRecipe.fulfilled, (state: AuthState, action) => {
      state.userRecipes.push(action.payload);
    });
    builder.addCase(deleteFavoriteRecipe.fulfilled, (state: AuthState, action) => {
      state.userRecipes = state.userRecipes.filter(item => item.id !== action.payload.id);
    });
    builder.addMatcher(isRejectedAction, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addMatcher(isPendingAction, state => {
      state.loading = true;
      state.error = null;
    });
  },
});

export const { logout } = accountSlice.actions;
export default accountSlice.reducer;
