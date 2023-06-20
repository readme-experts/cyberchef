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

@Controller('/api/user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private recipeService: RecipeService
  ) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Post()
  async addUserAvatar(@Request() req, @Res() res) {
    const userId = req.user.userId;
    const imageLink = req.body.imageLink;
    if (!imageLink) {
      res.code(400).send({ error: 'no link for image provided' });
      return res;
    } else {
      const avatarData = { userId, imageLink };
      return await this.userService.addAvatar(avatarData);
    }
  }
}
