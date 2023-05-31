import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'account/register',
  async ({ email, password }, { rejectWithValue }) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    const data = {
      email, password, username: email
    };
    try {
      const response = await fetch('api/auth/registration', {
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
      return rejectWithValue(error.response.data.message ?? error.message);
    }

  },
);
