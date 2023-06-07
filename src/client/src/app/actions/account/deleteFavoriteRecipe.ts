import { RecipeModel } from '../../../services/models/RecipeModel';
import { AuthStoreError } from '../../slices/types/Auth/AuthState';
import { createAppAsyncThunk } from '../../store';

export const deleteFavoriteRecipe = createAppAsyncThunk<RecipeModel,
  RecipeModel,
  { rejectValue: AuthStoreError }>(
    'account/deleteFavoriteRecipe',
    async (recipe, thunkAPI) => {
      if (!thunkAPI.extra.userService.token) {
        thunkAPI.extra.userService.setToken(thunkAPI.getState().account.token);
      }
      const thunk = thunkAPI.extra.thunkErrorWrapper(
        thunkAPI.extra.userService.deleteFavoriteRecipe,
        thunkAPI.rejectWithValue,
        thunkAPI.extra.userService
      );
      return await thunk(recipe);
    },
  );
