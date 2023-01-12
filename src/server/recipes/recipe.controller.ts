import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { CreateRecipeDto } from "./dto/recipe.dto";
import { RecipeService } from "./recipe.service";
const recipeCategories = require('./recipeCategories')
import * as jsonRecipes from '../../parser/data/recipes.json'



@Controller("/recipes")
export class RecipeController {
    constructor(private recipeService : RecipeService) {}
    @Post()
    addRecipe(@Body() dto: CreateRecipeDto) {     
        return this.recipeService.addRecipe(dto);
    }

    @Get('/allrecipes')
    getAllRecipes() {
        return this.recipeService.getAllRecipes()
    }

    @Get()
    getRecipeByName(@Body() recipe) {
        return this.recipeService.getRecipeByName(recipe.name)
    }

    @Post('/categories')
    addCategories(recipesObject) { 
        recipesObject = recipeCategories
        return this.recipeService.addRecipeCategoriesToDb(recipesObject)
    }

    @Post('/addRecipes')
    addRecipes(recipes) {
        recipes = jsonRecipes
        return  this.recipeService.addParsedRecipesToDb(recipes)
    }
}
