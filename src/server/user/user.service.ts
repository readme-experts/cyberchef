import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { UserRepository } from '../../database/repositories/user';
import { UserEntity } from './Entities/user.entity';
import { FavouriteRecipeEntity } from '../recipes/Entities/favouriteRecipe.entity';

const prisma = new PrismaService();
const user = new UserRepository(prisma);

@Injectable()
export class UserService {
  async addUser(regData) {
    return await user.add(regData);
  }
  async findUser(username): Promise<UserEntity> {
    return await user.find(username);
  }

  async addRecipe(recipeData) {
    return await user.addRecipe(recipeData);
  }

  async getRecipes(recipeData): Promise<FavouriteRecipeEntity[]> {
    return await user.findRecipes(recipeData);
  }

  async deleteRecipe(recipeData) {
    return await user.deleteRecipe(recipeData);
  }
}
