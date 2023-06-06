import { Recipe } from '../../../../services/models/Recipe';

export type RecipeError = string | Error | null | undefined;
export interface RecipeState {
  recipes: Recipe[],
  loading: boolean,
  error: RecipeError
}
