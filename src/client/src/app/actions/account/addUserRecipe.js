import { createAsyncThunk } from '@reduxjs/toolkit';

export const addUserRecipe = createAsyncThunk(
  'account/addRecipe',
  async ({ recipe }, { getState, rejectWithValue }) => {
    try {
      const token = getState()?.account.token;
      const headers = {
        'Content-Type': 'application/json',
        'authorization': token,
      };
      const response = await fetch('/api/user/recipes', {
        method: 'PUT',
        headers,
        body: { recipeId: JSON.stringify(recipe.id) },
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
