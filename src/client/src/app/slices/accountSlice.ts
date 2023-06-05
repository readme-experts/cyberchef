import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../actions/account/loginUser';
import { registerUser } from '../actions/account/registerUser';
import { loadFavoriteRecipes } from '../actions/account/loadFavoriteRecipes';
import { addFavoriteRecipe } from '../actions/account/addFavoriteRecipe';
import { deleteFavoriteRecipe } from '../actions/account/deleteFavoriteRecipe';

const initialState = {
  user: JSON.parse(localStorage.getItem('cyberChefUser')),
  token: localStorage.getItem('cyberChefToken'),
  userRecipes: [],
  loading: false,
  error: null,
};

const storageNames = {
  user: 'cyberChefUser',
  token: 'cyberChefToken',
};

const isRejectedAction = action => action.type.endsWith('rejected');
const isPendingAction = action => action.type.endsWith('pending');

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem(storageNames.user);
      localStorage.removeItem(storageNames.token);
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      localStorage.setItem(storageNames.user, JSON.stringify(state.user));
      localStorage.setItem(storageNames.token, state.token);
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      localStorage.setItem(storageNames.user, JSON.stringify(state.user));
      localStorage.setItem(storageNames.token, state.token);
    });
    builder.addCase(loadFavoriteRecipes.fulfilled, (state, action) => {
      state.userRecipes = action.payload;
    });
    builder.addCase(addFavoriteRecipe.fulfilled, (state, action) => {
      state.userRecipes.push(action.payload);
    });
    builder.addCase(deleteFavoriteRecipe.fulfilled, (state, action) => {
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