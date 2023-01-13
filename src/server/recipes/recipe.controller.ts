import { Body, Controller, Get, Res, Post } from '@nestjs/common';
import { CreateRecipeDto } from './dto/recipe.dto';
import { RecipeService } from './recipe.service';
import { recipeCategories } from './recipeCategories';
import * as jsonRecipes from '../../parser/data/recipes.json';

@Controller('/recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Post()
  addRecipe(@Body() dto: CreateRecipeDto, @Res() res) {
    if (!dto) {
      return res.status(400).json({ message: 'no recipeId provided' });
    }
    return this.recipeService.addRecipe(dto);
  }

  @Get('/allRecipes')
  getAllRecipes() {
    return this.recipeService.getAllRecipes();
  }

  @Get()
  getRecipeByName(@Body() recipe, @Res() res) {
    if (!recipe) {
      return res.status(400).json({ message: `recipe was not provided` });
    }
    return this.recipeService.getRecipeByName(recipe.name);
  }

  @Post('/categories')
  addCategories(recipesObject, @Res() res) {
    if (!recipesObject) {
      return res.status(400).json({
        message: `recipe categories object
           was not provided`,
      });
    }
    recipesObject = recipeCategories;
    return this.recipeService.addRecipeCategoriesToDb(recipesObject);
  }

  @Post('/addRecipes')
  addRecipes(recipes, @Res() res) {
    recipes = jsonRecipes;
    if (!recipes) {
      return res.status(400).json({
        message: `recipes from json file
            were not provided`,
      });
    }
    return this.recipeService.addParsedRecipesToDb(recipes);
  }
}
