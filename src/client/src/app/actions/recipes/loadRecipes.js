import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadRecipes = createAsyncThunk(
  'recipes/loadRecipes',
  async ({ queryString }, { getState, rejectWithValue }) => {
    try {
      const token = getState()?.account.token;
      const headers = {
        'Content-Type': 'application/json',
        'authorization': token
      };
      const params = new URLSearchParams({ recipeName: queryString });
      const response = await fetch('/api/recipes?' + params, {
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
