import { RecipeModel } from '../../../services/models/RecipeModel';
import { createAppAsyncThunk } from '../../utils/createAppAsync';
import { RecipeStoreError } from '../../slices/types/Recipe/RecipeState';

export const loadRecipes = createAppAsyncThunk<RecipeModel[],
  string,
  { rejectValue: RecipeStoreError }>(
    'recipes/loadRecipes',
    async (queryString: string, thunkAPI) => {
      if (!thunkAPI.extra.recipeService.token) {
        thunkAPI.extra.recipeService.setToken(thunkAPI.getState().account.token);
      }
      const thunk = thunkAPI.extra.thunkErrorWrapper(
        thunkAPI.extra.recipeService.getRecipesByName,
        thunkAPI.rejectWithValue,
        thunkAPI.extra.recipeService
      );
      const params = new URLSearchParams({ recipeName: queryString });
      return await thunk(params);
    },
  );
