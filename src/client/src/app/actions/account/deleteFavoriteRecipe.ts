import { AuthStoreError } from '../../slices/types/Auth/AuthState';
import { createAppAsyncThunk } from '../../utils/createAppAsyncThunk';
import { thunkErrorWrapper } from '../../utils/thunkErrorWrapper';
import { RecipeModel } from '../../../services/models/RecipeModel';

export const deleteFavoriteRecipe = createAppAsyncThunk<RecipeModel,
  RecipeModel,
  { rejectValue: AuthStoreError }>(
    'account/deleteFavoriteRecipe',
    async (recipe, thunkAPI) => {
      const user = thunkAPI.getState().account.user;
      const token = thunkAPI.getState().account.token;
      if (!thunkAPI.extra.userService.token) {
        thunkAPI.extra.userService.setToken(token);
      }
      if (!user) {
        return thunkAPI.rejectWithValue(new Error('No user provided'));
      }
      const thunk = thunkErrorWrapper(
        thunkAPI.extra.userService.deleteFavoriteRecipe,
        thunkAPI.rejectWithValue,
        thunkAPI.extra.userService
      );
      await thunk(user.id, recipe.id);
      return recipe;
    },
  );
