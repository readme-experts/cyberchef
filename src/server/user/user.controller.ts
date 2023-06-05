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
import { LocalAuthGuard } from 'auth/session/local-auth.guard';
import { AuthenticatedGuard } from '../auth/session/authenticated.guard';

@Controller('/api/user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private recipeService: RecipeService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async addFavRecipe(@Request() req, @Res() res) {
    const userId = req.user.userId;
    const recipeId = req.body.recipeId;
    if (!recipeId) {
      res.code(400).send({ error: 'no recipeId provided' });
      return res;
    } else {
      const recipeData = { userId, recipeId };
      return await this.userService.addRecipe(recipeData);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Post('test')
  async printConsole(@Request() req) {
    return { msg: 'Logged in' };
  }
  @UseGuards(LocalAuthGuard)
  @Get()
  async getFavRecipes(@Request() req) {
    const userId = req.user.userId;
    const recipesId = await this.userService.getRecipes(userId);
    const favRecipes = [];
    for (const el of recipesId) {
      favRecipes.push(await this.recipeService.getRecipeById(el));
    }
    return favRecipes;
  }

  @UseGuards(LocalAuthGuard)
  @Delete()
  deleteFavRecipe(@Request() req, res) {
    const userId = req.user.userId;
    const recipeId = req.body.recipeId;
    if (!recipeId) {
      res.code(400).send({ error: 'no recipeId provided' });
      return res;
    }
    const recipeData = { userId, recipeId };
    return this.userService.deleteRecipe(recipeData);
  }
}
