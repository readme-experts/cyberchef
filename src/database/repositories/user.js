'use strict';

export default class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async add(userData) {
    try {
      await this.prisma.users.create({
        data: {
          email: userData.email,
          username: userData.username,
          password: userData.passwordhash,
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async find(username) {
    return await this.prisma.users.findUnique({
      where: {
        username,
      },
    }); //returns user object
  }

  async findRecipes(userId) {
    let favRecipes = await this.prisma.favourite_recipes.findMany({
      where: {
        user_id: parseInt(userId),
      },
      select: {
        recipe_id: true,
      },
    });
    favRecipes = favRecipes.map(el => el.recipe_id);
    return favRecipes; //returns an array user favourite recipes ids
  }

  async addRecipe(recipeData) {
    const favRecipe = await this.prisma.favourite_recipes.create({
      data: {
        user_id: recipeData.userId,
        recipe_id: recipeData.recipeId,
      },
    });
    if (typeof favRecipe !== 'undefined' && favRecipe) {
      return true;
    }
  }

  async deleteRecipe(recipeData) {
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
}
