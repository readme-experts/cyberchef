import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'account/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.authService.login(credentials);
      if (response.error) {
        return thunkAPI.rejectWithValue(response.error);
      }
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
