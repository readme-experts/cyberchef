import CategoryRepository from '../../database/repositories/category';
import RecipeRepository from '../../database/repositories/recipe';
import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/recipe.dto';
import { PrismaService } from '../prisma.service';
import { recipeCategories } from './recipeCategories';
import { RecipeEntity } from './Entities/recipe.entity';

const prisma = new PrismaService();
const recipe = new RecipeRepository(prisma);
const categories = new CategoryRepository(prisma);

@Injectable()
export class RecipeService {
  async addRecipe(dto: CreateRecipeDto) {
    return await recipe.add(dto);
  }

  async getRecipeById(id): Promise<RecipeEntity> {
    return await recipe.find(id);
  }

  async getAllRecipes(): Promise<RecipeEntity[]> {
    return await recipe.findAll();
  }
  async getRecipeByName(recipeName): Promise<RecipeEntity> {
    return await recipe.search(recipeName);
  }

  async addRecipeCategoriesToDb(recipesArray) {
    for (let i = 0; i < Object.keys(recipesArray).length; i++) {
      await categories.add(Object.keys(recipesArray)[i]);
    }
  }

  async addParsedRecipesToDb(jsonRecipes) {
    for (const el of jsonRecipes) {
      el.categoryId = recipeCategories[el.categoryId];
      await this.addRecipe(el);
    }
  }
}
