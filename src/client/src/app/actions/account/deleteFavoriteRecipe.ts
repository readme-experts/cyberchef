import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteFavoriteRecipe = createAsyncThunk(
  'account/deleteFavoriteRecipe',
  async ({ recipe }, thunkAPI) => {
    if (!thunkAPI.extra.userService.token) {
      thunkAPI.extra.userService.setToken(thunkAPI.getState().account.token);
    }
    const thunk = thunkAPI.extra.thunkErrorWrapper(
      thunkAPI.extra.userService.deleteFavoriteRecipe,
      thunkAPI.rejectWithValue,
      thunkAPI.extra.userService
    );
    await thunk(recipe);
  },
);
