import { createAsyncThunk } from '@reduxjs/toolkit';
import RecipeService from '../../services/RecipeService';
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';
import { AppDispatch, RootState } from '../store';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState,
  dispatch: AppDispatch,
  rejectValue: string,
  extra: { recipeService: RecipeService, authService: AuthService, userService: UserService }
}>();
