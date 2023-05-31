import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'account/register',
  async ({ credentials }, thunkAPI) => {
    const thunk = thunkAPI.extra.thunkErrorWrapper(
      thunkAPI.extra.authService.register,
      thunkAPI.rejectWithValue,
      thunkAPI.extra.authService
    );
    await thunk(credentials);
  },
);
