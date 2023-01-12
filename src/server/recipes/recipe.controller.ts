import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { CreateRecipeDto } from "./dto/recipe.dto";
import { RecipeService } from "./recipe.service";

@Controller("/api")
export class RecipeController {
    constructor(private recipeService : RecipeService) {}
    @Post('/recipes')
    addRecipe(@Body() dto: CreateRecipeDto) {        
        return this.recipeService.addRecipe(dto);
    }

    @Get('/recipes/allrecipes')
    getAllRecipes() {
        return this.recipeService.getAllRecipes()
    }

    @Get('/recipes')
    getRecipeByName(@Query('recipeName') recipeName : string) {
        return this.recipeService.getRecipeByName(recipeName)
    }

    @Get('/user/recipes')
    getRecipeById(@Query('recipeId') recipeId : number) {
        return this.recipeService.getRecipeById(recipeId)
    }
}


