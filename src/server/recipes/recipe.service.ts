import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './recipe.dto';

import { PrismaService } from '../prisma.service';
import { RecipeRepository } from '../../database/repositories/recipe';

const prisma = new PrismaService();
const recipe = new RecipeRepository(prisma);

@Injectable()
export class RecipeService {
  async addRecipe(dto: CreateRecipeDto) {
    return await recipe.add(dto);
  }

  async getRecipeById(id) {
    return await recipe.find(id);
  }

  async getAllRecipes() {
    return await recipe.findAll();
  }

  async getRecipeByName(recipeName) {
    return await recipe.search(recipeName);
  }
}
