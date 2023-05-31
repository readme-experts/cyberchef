import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadUserRecipes = createAsyncThunk(
  'account/loadUserRecipes',
  async (_, { getState, rejectWithValue }) => {
    const token = getState()?.account.token;
    const headers = {
      'Content-Type': 'application/json',
      'authorization': token,
    };
    try {
      const response = await fetch('api/user/', {
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
      return rejectWithValue(error.response.data.message ?? error.message);
    }

  },
);
