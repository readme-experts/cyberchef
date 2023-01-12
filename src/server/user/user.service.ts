import { Injectable } from '@nestjs/common';
import { FavouriteRecipeEntity } from '../recipes/Entities/favouriteRecipe.entity';
import { UserEntity } from './Entities/user.entity';
import { UserRepository } from '../repos/user.repository';

@Injectable()
export class UserService {
  constructor(private user: UserRepository) {}

  async addRecipe(recipeData) {
    return await this.user.addRecipe(recipeData);
  }

  async getRecipes(recipeData): Promise<FavouriteRecipeEntity[]> {
    return await this.user.findRecipes(recipeData);
  }
  async findUser(username: string): Promise<UserEntity> {
    return await this.user.find(username);
  }

  async deleteRecipe(recipeData) {
    return await this.user.deleteRecipe(recipeData);
  }
}
