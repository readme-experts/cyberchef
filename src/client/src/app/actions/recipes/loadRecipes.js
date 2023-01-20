import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadRecipes = createAsyncThunk(
  'recipes/loadRecipes',
  async ({ queryString }, { getState, rejectWithValue }) => {
    const token = getState()?.account.token;
    const headers = {
      'Content-Type': 'application/json',
      'authorization': token,
    };
    const params = new URLSearchParams({ recipeName: queryString });
    try {
      const response = await fetch('/recipes?' + params, {
        method: 'GET',
        headers,
      });
      console.log(await response.json());
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
