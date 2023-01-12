import { RecipeService } from '../recipes/recipe.service';

import {
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'auth/auth.service';
import { JwtAuthGuard } from 'auth/JWT/jwt-auth.guard';

@Controller('/user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private recipeService: RecipeService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addFavRecipe(@Request() req, @Res() res) {
    const userId = req.user.userId;
    const recipeId = req.body.recipeId;
    if (!recipeId) {
      return res.status(400).json({ message: 'no recipeId provided' });
    }

    const recipeData = { userId: userId, recipeId: recipeId };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getFavRecipes(@Request() req) {
    const userId = req.user.userId;
    const recipesId = await this.userService.getRecipes(userId);
    const favRecipes = [];
    for (let el of recipesId) {
      favRecipes.push(await this.recipeService.getRecipeById(el));
    }
    return favRecipes;
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteFavRecipe(@Request() req, res) {
    const userId = req.user.userId;
    const recipeId = req.body.recipeId;
    if (!recipeId) {
      return res.status(400).json({ message: 'no recipeId provided' });
    }

    const recipeData = { userId: userId, recipeId: recipeId };
    return this.userService.deleteRecipe(recipeData);
  }
}
