import { RecipeModule } from './recipe.module';
import {Injectable} from '@nestjs/common';
import { CreateRecipeDto } from './recipe.dto';

import { PrismaService } from '.././prisma.service';
import { recipes as RecipeModel, Prisma } from '@prisma/client';
import { RecipeRepository } from '../../database/repositories/recipe';


const prisma = new PrismaService();
const recipe = new RecipeRepository(prisma);

@Injectable()
export class RecipeService {
  async addRecipe (dto : CreateRecipeDto ) {
    // return `kolya : ${dto.name}, products : ${dto.products}`
    const newRecipe = await recipe.add(dto)
    return newRecipe

  }

  async getRecipeById (id) {
    const recipeById = await recipe.find(id)
    return recipeById

  }

  async getAllRecipes ()  {
    const recipes = await recipe.findAll()
    return recipes

  }

  async getRecipeByName(recipeName) {
    const recipeByName = await recipe.search(recipeName)
    return recipeByName
  }

  async addFavRecipe () {


  }

  async getFavRecipes () {


  }

  async deleteFavRecipe () {


  }

}

