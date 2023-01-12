import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { CreateRecipeDto } from "./dto/recipe.dto";
import { RecipeService } from "./recipe.service";

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
}
