import { createAppAsyncThunk } from '../../utils/createAppAsyncThunk';
import { AuthStoreError } from '../../slices/types/Auth/AuthState';
import { thunkErrorWrapper } from '../../utils/thunkErrorWrapper';
import { RecipeModel } from '../../../services/models/RecipeModel';

export const addFavoriteRecipe = createAppAsyncThunk<RecipeModel,
  { userId: number, recipe: RecipeModel },
  { rejectValue: AuthStoreError }>(
    'account/addFavoriteRecipe',
    async ({ userId, recipe }, thunkAPI) => {
      if (!thunkAPI.extra.userService.token) {
        thunkAPI.extra.userService.setToken(thunkAPI.getState().account.token);
      }
      const thunk = thunkErrorWrapper(
        thunkAPI.extra.userService.addFavoriteRecipe,
        thunkAPI.rejectWithValue,
        thunkAPI.extra.userService
      );
      await thunk(userId, recipe.id);
      return recipe;
    },
  );
