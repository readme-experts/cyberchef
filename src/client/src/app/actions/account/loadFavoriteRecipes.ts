import { createAppAsyncThunk } from '../../store';
import { Recipe } from '../../../services/models/Recipe';
import { AuthError } from '../../slices/types/Auth/AuthState';

export const loadFavoriteRecipes = createAppAsyncThunk<Recipe[],
  null,
  { rejectValue: AuthError }>(
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
