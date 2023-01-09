'use strict';

class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async add(username, email, passwordhash) {
    try {
      await this.prisma.users.create({
        data: {
          email,
          username,
          password: passwordhash,
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async find(username) {
    const user = await this.prisma.users.findUnique({
      where: {
        username,
      },
    });
    return user; //returns user object
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

  async addRecipe(userId, recipeId) {
    const favRecipe = await this.prisma.favourite_recipes.create({
      data: {
        user_id: userId,
        recipe_id: recipeId,
      },
    });
    if (typeof favRecipe !== 'undefined' && favRecipe) {
      return true;
    }
  }

  async deleteRecipe(userId, recipeId) {
    try {
      await this.prisma.favourite_recipes.deleteMany({
        where: {
          user_id: userId,
          recipe_id: recipeId,
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

module.exports = UserRepository;
