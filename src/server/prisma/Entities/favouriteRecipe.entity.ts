import { RecipeEntity } from './recipe.entity';
import { UserEntity } from './user.entity';

export interface FavouriteRecipeEntity {
  id: number;
  user_id: number;
  recipe_id: number;
  recipes?: RecipeEntity[];
  users?: UserEntity[];
}
