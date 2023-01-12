import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateRecipeDto } from './DTO/recipe.dto';
import { RecipeService } from './recipe.service';

@Controller('/api')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}
  @Post('/recipes')
  addRecipe(@Body() dto: CreateRecipeDto) {
    return this.recipeService.addRecipe(dto);
  }

  @Get('/recipes/all-recipes')
  getAllRecipes() {
    return this.recipeService.getAllRecipes();
  }

  @Get('/recipes')
  getRecipeByName(@Query('recipeName') recipeName: string) {
    return this.recipeService.getRecipeByName(recipeName);
  }

  @Get('/user/recipes')
  getRecipeById(@Query('recipeId') recipeId: number) {
    return this.recipeService.getRecipeById(recipeId);
  }
}
