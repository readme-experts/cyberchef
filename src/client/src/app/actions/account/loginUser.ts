import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'account/login',
  async ({ credentials }, thunkAPI) => {
    const thunk = thunkAPI.extra.thunkErrorWrapper(
      thunkAPI.extra.authService.login,
      thunkAPI.rejectWithValue,
      thunkAPI.extra.authService
    );
    await thunk(credentials);
  }
);
