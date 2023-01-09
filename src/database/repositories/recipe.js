'use strict';

class RecipeRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async add(recipeData) {
    try {
      await this.prisma.recipes.create({
        data: {
          name: recipeData.name,
          category_id: parseInt(recipeData.categoryId),
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

  async find(recipeId) {
    const recipe = await this.prisma.recipes.findUnique({
      where: {
        id: parseInt(recipeId),
      },
    });
    return recipe;
  }

  async findAll() {
    const allRecipes = await this.prisma.recipes.findMany();
    return allRecipes;
  }

  async delete(recipeId) {
    try {
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
      await this.prisma.$transaction([deleteFavRecipes, deleteRecipe]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async search(str) {
    const recipes = await this.prisma.recipes.findMany({
      where: {
        name: {
          contains: str,
        },
      },
    });
    return recipes;
  }
}

module.exports = RecipeRepository;
