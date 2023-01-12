import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'account/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const data = {
        email, password,
      };
      const response = await fetch('auth/registration', {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
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
