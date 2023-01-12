import { Injectable } from '@nestjs/common';

import { PrismaService } from '.././prisma.service';
import { UserRepository } from '../../database/repositories/user';

const prisma = new PrismaService();
const user = new UserRepository(prisma);

@Injectable()
export class UserService {
  async addUser(regData) {
    return await user.add(regData);
  }
  async findUser(username) {
    return await user.find(username);
  }

  async addRecipe(recipeData) {
    return await user.addRecipe(recipeData);
  }

  async getRecipes(recipeData) {
    return await user.findRecipes(recipeData);
  }

  async deleteRecipe(recipeData) {
    return await user.deleteRecipe(recipeData);
  }
}
