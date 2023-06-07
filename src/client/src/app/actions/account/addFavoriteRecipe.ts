import { createAppAsyncThunk } from '../../store';
import { RecipeModel } from '../../../services/models/RecipeModel';
import { AuthError } from '../../slices/types/Auth/AuthState';

export const addFavoriteRecipe = createAppAsyncThunk<RecipeModel,
  RecipeModel,
  { rejectValue: AuthError }>(
    'account/addFavoriteRecipe',
    async (recipe: RecipeModel, thunkAPI) => {
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
