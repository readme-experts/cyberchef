import { createAppAsyncThunk } from '../../utils/createAppAsyncThunk';
import { AuthStoreError } from '../../slices/types/Auth/AuthState';
import { thunkErrorWrapper } from '../../utils/thunkErrorWrapper';
import { RecipeModel } from '../../../services/models/RecipeModel';

export const addFavoriteRecipe = createAppAsyncThunk<RecipeModel,
  RecipeModel,
  { rejectValue: AuthStoreError }>(
    'account/addFavoriteRecipe',
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
        thunkAPI.extra.userService.addFavoriteRecipe,
        thunkAPI.rejectWithValue,
        thunkAPI.extra.userService
      );
      await thunk(user.id, recipe.id);
      return recipe;
    },
  );
