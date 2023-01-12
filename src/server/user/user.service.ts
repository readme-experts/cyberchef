import { Injectable } from "@nestjs/common";
import { PrismaService } from '.././prisma.service';
import { UserRepository } from '../../database/repositories/user';
import { UserEntity } from './Entities/user.entity';
import { FavouriteRecipeEntity } from '../recipes/Entities/favouriteRecipe.entity';

const prisma = new PrismaService();
const user = new UserRepository(prisma);

@Injectable()
export class UserService {
    async addRecipe(recipeData) {
        const userFavRecipe = await user.addRecipe(recipeData)
        return userFavRecipe
    }

  async getRecipes(recipeData): Promise<FavouriteRecipeEntity[]> {
    return await user.findRecipes(recipeData);
  }

  async deleteRecipe(recipeData) {
    return await user.deleteRecipe(recipeData);
  }
}
