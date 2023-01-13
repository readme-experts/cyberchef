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
      res.code(400).send({ error: 'no recipeId provided' });
    } else {
      res.send(this.recipeService.addRecipe(dto));
    }
    return res;
  }

  @Get('/allRecipes')
  getAllRecipes() {
    return this.recipeService.getAllRecipes();
  }

  @Get()
  getRecipeByName(@Body() recipe, @Res() res) {
    if (!recipe) {
      res.code(400).send({ error: `recipe was not provided` });
    } else {
      res.send(this.recipeService.getRecipeByName(recipe.name));
    }
    return res;
  }

  @Post('/categories')
  addCategories(recipesObject, @Res() res) {
    if (!recipesObject) {
      res.code(400).send({
        error: `recipe categories object
           was not provided`,
      });
      return res;
    } else {
      recipesObject = recipeCategories;
      return this.recipeService.addRecipeCategoriesToDb(recipesObject);
    }
  }

  @Post('/addRecipes')
  addRecipes(recipes, @Res() res) {
    recipes = jsonRecipes;
    if (!recipes) {
      res.code(400).send({
        error: `recipes from json file
            were not provided`,
      });
      return res;
    } else {
      return this.recipeService.addParsedRecipesToDb(recipes);
    }
  }
}
