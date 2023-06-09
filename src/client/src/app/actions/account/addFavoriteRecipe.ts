import { createAppAsyncThunk } from '../../utils/createAppAsyncThunk';
import { AuthStoreError } from '../../slices/types/Auth/AuthState';
import { thunkErrorWrapper } from '../../utils/thunkErrorWrapper';

export const addFavoriteRecipe = createAppAsyncThunk<Promise<void>,
  { userId: number, recipeId: number },
  { rejectValue: AuthStoreError }>(
    'account/addFavoriteRecipe',
    async (ids: { userId: number, recipeId: number }, thunkAPI) => {
      if (!thunkAPI.extra.userService.token) {
        thunkAPI.extra.userService.setToken(thunkAPI.getState().account.token);
      }
      const { userId, recipeId } = ids;
      const thunk = thunkErrorWrapper(
        thunkAPI.extra.userService.addFavoriteRecipe,
        thunkAPI.rejectWithValue,
        thunkAPI.extra.userService
      );
      return await thunk(userId, recipeId);
    },
  );
