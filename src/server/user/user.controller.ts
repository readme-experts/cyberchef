import { RecipeService } from './../recipes/recipe.service';

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  UseGuards,
  Request
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthService } from 'auth/auth.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@Controller()
export class UserController {
  constructor( private userService : UserService, private  authService: AuthService,
    private recipeService : RecipeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/user/recipes')
  addFavRecipe(@Request() req) {
    const userId  =  req.user.userId
    const recipeId = req.body.recipeId
    
    const recipeData = {"userId" : userId, "recipeId" : recipeId}
    return this.userService.addRecipe(recipeData)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/recipes')
  async getFavRecipes(@Request() req) {
    const userId  =  req.user.userId
    const recipesId = await this.userService.getRecipes(userId)
    let favRecipes = []
    for(let el of recipesId){
      favRecipes.push(await this.recipeService.getRecipeById(el))
    }
    return favRecipes
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/user/recipes')
  deleteFavRecipe(@Request() req) {
    const userId  =  req.user.userId
    const recipeId = req.body.recipeId
    
    const recipeData = {"userId" : userId, "recipeId" : recipeId}
    return this.userService.deleteRecipe(recipeData)
  }
  

}
