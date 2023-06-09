import { createAppAsyncThunk } from '../../utils/createAppAsyncThunk';
import { RecipeModel } from '../../../services/models/RecipeModel';
import { AuthStoreError } from '../../slices/types/Auth/AuthState';
import { thunkErrorWrapper } from '../../utils/thunkErrorWrapper';

export const loadFavoriteRecipes = createAppAsyncThunk<RecipeModel[],
  null,
  { rejectValue: AuthStoreError }>(
    'account/loadUserFavorites',
    async (_, thunkAPI) => {
      if (!thunkAPI.extra.userService.token) {
        thunkAPI.extra.userService.setToken(thunkAPI.getState().account.token);
      }
      const thunk = thunkErrorWrapper(
        thunkAPI.extra.userService.getFavoriteRecipes,
        thunkAPI.rejectWithValue,
        thunkAPI.extra.userService
      );
      return await thunk();
    },
  );
