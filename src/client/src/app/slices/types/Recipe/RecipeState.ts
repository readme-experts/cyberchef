import { RecipeModel } from '../../../../services/models/RecipeModel';

export type RecipeStoreError =  Error | null | undefined;
export interface RecipeState {
  recipes: RecipeModel[],
  loading: boolean,
  error: RecipeStoreError
}
