import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from '../recipes/dto/recipe.dto';
import { RecipeEntity } from '../prisma/Entities/recipe.entity';

@Injectable()
export class RecipeRepository {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async add(recipeData: CreateRecipeDto) {
    try {
      await this.prisma.recipes.create({
        data: {
          name: recipeData.name,
          category_id: +recipeData.categoryId,
          products: recipeData.products,
          description: recipeData.description,
          image_link: recipeData.imageLink,
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async find(recipeId: string): Promise<RecipeEntity> {
    return this.prisma.recipes.findUnique({
      where: {
        id: parseInt(recipeId),
      },
    });
  }

  async findAll(): Promise<RecipeEntity[]> {
    return this.prisma.recipes.findMany();
  }

  async delete(recipeId: string): Promise<boolean> {
    const deleteFavRecipes = this.prisma.favourite_recipes.deleteMany({
      where: {
        recipe_id: parseInt(recipeId),
      },
    });
    const deleteRecipe = this.prisma.recipes.delete({
      where: {
        id: parseInt(recipeId),
      },
    });
    try {
      await this.prisma.$transaction([deleteFavRecipes, deleteRecipe]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async search(str: string): Promise<RecipeEntity[]> {
    return this.prisma.recipes.findMany({
      where: {
        name: {
          contains: str,
        },
      },
    });
  }
}
