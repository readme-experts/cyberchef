import { RecipeModel } from '../../../../services/models/RecipeModel';

export type RecipeError = string | Error | null | undefined;
export interface RecipeState {
  recipes: RecipeModel[],
  loading: boolean,
  error: RecipeError
}
