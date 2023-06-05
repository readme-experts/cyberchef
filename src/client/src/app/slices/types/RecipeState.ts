import { Recipe } from '../../../services/models/Recipe';

export interface RecipeState {
  recipes: Recipe[],
  loading: boolean,
  error: Error | null,
}
