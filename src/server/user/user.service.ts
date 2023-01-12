import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import UserRepository from '../../database/repositories/user';
import { FavouriteRecipeEntity } from '../recipes/Entities/favouriteRecipe.entity';
import { UserEntity } from './Entities/user.entity';

const prisma = new PrismaService();
const user = new UserRepository(prisma);

@Injectable()
export class UserService {
  async addRecipe(recipeData) {
    return await user.addRecipe(recipeData);
  }

  async getRecipes(recipeData): Promise<FavouriteRecipeEntity[]> {
    return await user.findRecipes(recipeData);
  }
  async findUser(username: string): Promise<UserEntity> {
    return await user.find(username);
  }

  async deleteRecipe(recipeData) {
    return await user.deleteRecipe(recipeData);
  }
}
