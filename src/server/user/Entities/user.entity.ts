import { FavouriteRecipeEntity } from '../../recipes/Entities/favouriteRecipe.entity';

export interface UserEntity {
  id: number;
  username: string;
  email: string;
  password: string;
  favourite_recipes: FavouriteRecipeEntity[];
}
