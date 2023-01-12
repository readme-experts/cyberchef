import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './DTO/recipe.dto';

import { PrismaService } from '../prisma.service';
import { RecipeRepository } from '../../database/repositories/recipe';
import { RecipeEntity } from './Entities/recipe.entity';

const prisma = new PrismaService();
const recipe = new RecipeRepository(prisma);

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
}
