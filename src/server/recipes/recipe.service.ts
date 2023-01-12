import { CategoryRepository } from '../../database/repositories/category';
import {Injectable} from '@nestjs/common';
import { CreateRecipeDto } from './dto/recipe.dto';

import { PrismaService } from '.././prisma.service';
import { RecipeRepository } from '../../database/repositories/recipe';
const recipeCategories = require('./recipeCategories')
const prisma = new PrismaService();
const recipe = new RecipeRepository(prisma);
const categories = new CategoryRepository(prisma)

@Injectable()
export class RecipeService {
  async addRecipe (dto : CreateRecipeDto ) {
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

  async addRecipeCategoriesToDb(recipesArray) {
    for(let i = 0 ; i < Object.keys(recipesArray).length; i++){
       await categories.add(Object.keys(recipesArray)[i]) 
    }
  }

  async addParsedRecipesToDb(jsonRecipes){
    for(const el of jsonRecipes){
      el.categoryId = recipeCategories.recipeCategories[el.categoryId]
      await this.addRecipe(el)      
    }
  }
}

