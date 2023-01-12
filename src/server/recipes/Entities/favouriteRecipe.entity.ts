import { RecipeEntity } from './recipe.entity';
import { UserEntity } from '../../user/Entities/user.entity';

export interface FavouriteRecipeEntity {
  id: number;
  user_id: number;
  recipe_id: number;
  recipes?: RecipeEntity[];
  users?: UserEntity[];
}
