import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from '../user/dto/registration.dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../prisma/Entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async add(userData: RegisterUserDto): Promise<boolean> {
    try {
      await this.prisma.users.create({
        data: {
          email: userData.email,
          username: userData.username,
          password: userData.passwordHash,
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async find(username: string): Promise<UserEntity> {
    return this.prisma.users.findUnique({
      where: {
        username,
      },
    }); //returns user object
  }

  async findRecipes(userId: string) {
    return this.prisma.favourite_recipes.findMany({
      where: {
        user_id: parseInt(userId),
      },
    }); //returns an array user favourite recipes ids
  }

  async addRecipe(recipeData): Promise<boolean> {
    const favRecipe = await this.prisma.favourite_recipes.create({
      data: {
        user_id: recipeData.userId,
        recipe_id: recipeData.recipeId,
      },
    });
    return !!(typeof favRecipe !== 'undefined' && favRecipe);
  }

  async deleteRecipe(recipeData): Promise<boolean> {
    try {
      await this.prisma.favourite_recipes.deleteMany({
        where: {
          user_id: recipeData.userId,
          recipe_id: recipeData.recipeId,
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async addAvatar(avatarData): Promise<UserEntity> {
    return this.prisma.users.update({
      where: { id: avatarData.userId },
      data: { image_link: avatarData.imageLink },
    });
  }
}
