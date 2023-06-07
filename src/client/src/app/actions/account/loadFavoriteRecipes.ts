import { createAppAsyncThunk } from '../../utils/createAppAsync';
import { RecipeModel } from '../../../services/models/RecipeModel';
import { AuthStoreError } from '../../slices/types/Auth/AuthState';

export const loadFavoriteRecipes = createAppAsyncThunk<RecipeModel[],
  null,
  { rejectValue: AuthStoreError }>(
    'account/loadUserFavorites',
    async (_, thunkAPI) => {
      if (!thunkAPI.extra.userService.token) {
        thunkAPI.extra.userService.setToken(thunkAPI.getState().account.token);
      }
      const thunk = thunkAPI.extra.thunkErrorWrapper(
        thunkAPI.extra.userService.getFavoriteRecipes,
        thunkAPI.rejectWithValue,
        thunkAPI.extra.userService
      );
      return await thunk();
    },
  );
