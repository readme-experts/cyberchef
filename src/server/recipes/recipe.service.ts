import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/recipe.dto';
import { recipeCategories } from './recipeCategories';
import { RecipeEntity } from '../prisma/Entities/recipe.entity';
import { RecipeRepository } from '../repositories/recipe.repository';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class RecipeService {
  constructor(
    private recipe: RecipeRepository,
    private categories: CategoryRepository
  ) {}

  async addRecipe(dto: CreateRecipeDto) {
    return await this.recipe.add(dto);
  }

  async getRecipeById(id): Promise<RecipeEntity> {
    return await this.recipe.find(id);
  }

  async getAllRecipes(): Promise<RecipeEntity[]> {
    return await this.recipe.findAll();
  }
  async getRecipeByName(recipeName): Promise<RecipeEntity[]> {
    return await this.recipe.search(recipeName);
  }

  async addRecipeCategoriesToDb(recipesArray) {
    for (let i = 0; i < Object.keys(recipesArray).length; i++) {
      await this.categories.add(Object.keys(recipesArray)[i]);
    }
  }

  async addParsedRecipesToDb(jsonRecipes) {
    for (const el of jsonRecipes) {
      el.categoryId = recipeCategories[el.categoryId];
      await this.addRecipe(el);
    }
  }
}
