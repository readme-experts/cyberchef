import { RecipeModel } from '../../../services/models/RecipeModel';
import { createAppAsyncThunk } from '../../utils/createAppAsyncThunk';
import { RecipeStoreError } from '../../slices/types/Recipe/RecipeState';
import { thunkErrorWrapper } from '../../utils/thunkErrorWrapper';

export const loadRecipes = createAppAsyncThunk<RecipeModel[],
  string,
  { rejectValue: RecipeStoreError }>(
    'recipes/loadRecipes',
    async (queryString: string, thunkAPI) => {
      if (!thunkAPI.extra.recipeService.token) {
        thunkAPI.extra.recipeService.setToken(thunkAPI.getState().account.token);
      }
      const thunk = thunkErrorWrapper(
        thunkAPI.extra.recipeService.getRecipesByName,
        thunkAPI.rejectWithValue,
        thunkAPI.extra.recipeService
      );
      const params = new URLSearchParams({ recipeName: queryString });
      return await thunk(params);
    },
  );
