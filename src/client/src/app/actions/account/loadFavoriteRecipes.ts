import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadFavoriteRecipes = createAsyncThunk(
  'account/loadUserFavorites',
  async (_, thunkAPI) => {
    if (!thunkAPI.extra.userService.token) {
      thunkAPI.extra.userService.setToken(thunkAPI.getState().account.token);
    }
    const thunk = thunkAPI.extra.thunkErrorWrapper(
      thunkAPI.extra.userService.getFavoriteRecipes,
      thunkAPI.rejectWithValue,
      thunkAPI.extra.userService
    );
    await thunk();
  },
);
