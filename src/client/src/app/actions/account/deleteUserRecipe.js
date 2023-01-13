import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteUserRecipe = createAsyncThunk(
  'account/deleteRecipe',
  async ({ recipe }, { getState, rejectWithValue }) => {
    try {
      const token = getState()?.account.token;
      const headers = {
        'Content-Type': 'application/json',
        'authorization': token,
      };
      const body = JSON.stringify({
        recipeId: recipe.id
      });
      const response = await fetch('api/user/', {
        method: 'DELETE',
        headers,
        body,
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