import { createAppAsyncThunk } from '../../store';
import { Recipe } from '../../../services/models/Recipe';
import { AuthError } from '../../slices/types/Auth/AuthState';

export const addFavoriteRecipe = createAppAsyncThunk<Recipe,
  Recipe,
  { rejectValue: AuthError }>(
    'account/addFavoriteRecipe',
    async (recipe: Recipe, thunkAPI) => {
      if (!thunkAPI.extra.userService.token) {
        thunkAPI.extra.userService.setToken(thunkAPI.getState().account.token);
      }
      const thunk = thunkAPI.extra.thunkErrorWrapper(
        thunkAPI.extra.userService.addFavoriteRecipe,
        thunkAPI.rejectWithValue,
        thunkAPI.extra.userService
      );
      return await thunk(recipe);
    },
  );
