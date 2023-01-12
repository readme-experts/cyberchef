import { RecipeEntity } from './recipe.entity';

export interface CategoryEntity {
  id: number;
  name: string;
  recipes?: RecipeEntity[];
}
