import { FavouriteRecipeEntity } from './favouriteRecipe.entity';
import { CategoryEntity } from './category.entity';

export interface RecipeEntity {
  id: number;
  name: string;
  category_id: number;
  products: string;
  description: string;
  image_link?: string;
  favourite_recipes?: FavouriteRecipeEntity[];
  categories?: CategoryEntity[];
}
