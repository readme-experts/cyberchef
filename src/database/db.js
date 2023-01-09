'use strict';

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class RecipeRepository {
  async add(name, categoryId, products, description, imageLink) {
    try {
      await prisma.recipes.create({
        data: {
          name,
          category_id: parseInt(categoryId),
          products,
          description,
          image_link: imageLink,
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async find(recipeId) {
    const recipe = await prisma.recipes.findUnique({
      where: {
        id: parseInt(recipeId),
      },
    });
    return recipe;
  }

  async findAll() {
    const allRecipes = await prisma.recipes.findMany();
    return allRecipes;
  }

  async delete(recipeId) {
    try {
      const deleteFavRecipes = prisma.favourite_recipes.deleteMany({
        where: {
          recipe_id: parseInt(recipeId),
        },
      });
      const deleteRecipe = prisma.recipes.delete({
        where: {
          id: parseInt(recipeId),
        },
      });
      await prisma.$transaction([deleteFavRecipes, deleteRecipe]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async search(str) {
    const recipes = await prisma.recipes.findMany({
      where: {
        name: {
          contains: str,
        },
      },
    });
    return recipes;
  }
}

class CategoryRepository {
  async add(name) {
    try {
      await prisma.categories.create({
        data: {
          name,
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async findAll() {
    const allCategories = await prisma.categories.findMany();
    return allCategories; //returns an array of all categories
  }
}

class UserRepository {
  async add(username, email, passwordhash) {
    try {
      await prisma.users.create({
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
    const user = await prisma.users.findUnique({
      where: {
        username,
      },
    });
    return user; //returns user object
  }

  async findRecipes(userId) {
    let favRecipes = await prisma.favourite_recipes.findMany({
      where: {
        user_id: parseInt(userId),
      },
      select: {
        recipe_id: true,
      },
    });
    favRecipes = favRecipes.map((el) => el.recipe_id);
    return favRecipes; //returns an array user favourite recipes ids
  }

  async addRecipe(userId, recipeId) {
    const favRecipe = await prisma.favourite_recipes.create({
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
      await prisma.favourite_recipes.deleteMany({
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

(async () => {
  const recipe = new RecipeRepository();
  const data = await recipe.delete(4);
  console.log(data);
})();

module.exports = {
  RecipeRepository,
  CategoryRepository,
  UserRepository,
};
