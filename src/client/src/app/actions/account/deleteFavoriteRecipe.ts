import { AuthStoreError } from '../../slices/types/Auth/AuthState';
import { createAppAsyncThunk } from '../../utils/createAppAsyncThunk';
import { thunkErrorWrapper } from '../../utils/thunkErrorWrapper';
import { RecipeModel } from '../../../services/models/RecipeModel';

export const deleteFavoriteRecipe = createAppAsyncThunk<RecipeModel,
  { recipe : RecipeModel },
  { rejectValue: AuthStoreError }>(
    'account/deleteFavoriteRecipe',
    async ({ recipe }, thunkAPI) => {
      if (!thunkAPI.extra.userService.token) {
        thunkAPI.extra.userService.setToken(thunkAPI.getState().account.token);
      }
      const thunk = thunkErrorWrapper(
        thunkAPI.extra.userService.deleteFavoriteRecipe,
        thunkAPI.rejectWithValue,
        thunkAPI.extra.userService
      );
      await thunk(recipe.id);
      return recipe;
    },
  );
