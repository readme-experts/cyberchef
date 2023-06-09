import { AuthStoreError } from '../../slices/types/Auth/AuthState';
import { createAppAsyncThunk } from '../../utils/createAppAsyncThunk';
import { thunkErrorWrapper } from '../../utils/thunkErrorWrapper';

export const deleteFavoriteRecipe = createAppAsyncThunk<void,
  { recipeId : number },
  { rejectValue: AuthStoreError }>(
    'account/deleteFavoriteRecipe',
    async ({ recipeId }, thunkAPI) => {
      if (!thunkAPI.extra.userService.token) {
        thunkAPI.extra.userService.setToken(thunkAPI.getState().account.token);
      }
      const thunk = thunkErrorWrapper(
        thunkAPI.extra.userService.deleteFavoriteRecipe,
        thunkAPI.rejectWithValue,
        thunkAPI.extra.userService
      );
      return await thunk(recipeId);
    },
  );
