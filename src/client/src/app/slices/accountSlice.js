import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../actions/account/loginUser';
import { registerUser } from '../actions/account/registerUser';
import { loadUserRecipes } from '../actions/account/loadUserRecipes';
import { addUserRecipe } from '../actions/recipes/loadRecipes';

const initialState = {
  user: localStorage.getItem('cyberChefUser'),
  token: localStorage.getItem('cyberChefToken'),
  userRecipes: [],
  loading: false,
  error: null
};

const storageNames = {
  user: 'cyberChefUser',
  token: 'cyberChefToken'
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
    }
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem(storageNames.user, state.user);
      localStorage.setItem(storageNames.token, state.token);
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem(storageNames.user, state.user);
      localStorage.setItem(storageNames.token, state.token);
    });
    builder.addCase(loadUserRecipes.fulfilled, (state, action) => {
      state.userRecipes = action.payload;
    });
    builder.addCase(addUserRecipe.fulfilled, (state, action) => {
      state.userRecipes.push(action.payload);
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

export default accountSlice.reducer;
