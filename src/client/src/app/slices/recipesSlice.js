import { createSlice } from '@reduxjs/toolkit';
import { loadRecipes } from '../actions/recipes/loadRecipes';

const initialState = {
  recipes: [],
  loading: false,
  error: null
};

const recipesSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadRecipes.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadRecipes.fulfilled, (state, action) => {
      state.loading = false;
      state.recipes = action.payload;
    });
    builder.addCase(loadRecipes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default recipesSlice.reducer;
