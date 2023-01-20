import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteUserRecipe = createAsyncThunk(
  'account/deleteRecipe',
  async ({ recipe }, { getState, rejectWithValue }) => {
    const token = getState()?.account.token;
    const headers = {
      'Content-Type': 'application/json',
      'authorization': token,
    };
    const body = JSON.stringify({
      recipeId: recipe.id
    });
    try {
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
      return rejectWithValue(error.response.data.message ?? error.message);
    }

  },
);
