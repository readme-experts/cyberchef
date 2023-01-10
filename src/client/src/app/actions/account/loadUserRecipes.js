import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadUserRecipes = createAsyncThunk(
  'account/loadUserRecipes',
  async ({ getState, rejectWithValue }) => {
    try {
      const token = getState()?.account.token;
      const headers = {
        'Content-Type': 'application/json',
        'authorization': token
      };
      const response = await fetch('/api/user/myrecipes', {
        method: 'GET',
        headers,
      });
      if (!response.ok) {
        return rejectWithValue(await response.json());
      }
      return {
        ...await response.json(),
      };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }

  },
);
