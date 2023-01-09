'use strict';

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addUserToDb(username, email, passwordhash) {
  const user = await prisma.users.create({
    data: {
      email,
      username,
      password: passwordhash,
    },
  });
  if (typeof user !== 'undefined' && user) {
    return true;
  }
}

async function addRecipeToDb(
  name,
  categoryId,
  products,
  description,
  imageLink
) {
  const recipe = await prisma.recipes.create({
    data: {
      name,
      category_id: parseInt(categoryId),
      products,
      description,
      image_link: imageLink,
    },
  });
  if (typeof recipe !== 'undefined' && recipe) {
    return true;
  }
}

async function addCategoryToDb(name) {
  const category = await prisma.categories.create({
    data: {
      name,
    },
  });
  if (typeof category !== 'undefined' && category) {
    return true;
  }
}

async function addUserFavRecipeToDb(userId, recipeId) {
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

async function getRecipe(recipeId) {
  const recipe = await prisma.recipes.findUnique({
    where: {
      id: parseInt(recipeId),
    },
  });
  return recipe; //returns recipe object
}

async function getAllRecipes() {
  const allRecipes = await prisma.recipes.findMany();
  return allRecipes; //returns an array of all recipes
}

async function getAllCategories() {
  const allCategories = await prisma.categories.findMany();
  return allCategories; //returns an array of all categories
}

async function getUserFavRecipes(userId) {
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

async function getUserData(username) {
  const user = await prisma.users.findUnique({
    where: {
      username,
    },
  });
  return user; //returns user object
}

async function deleteRecipe(recipeId) {
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
  const transaction = await prisma.$transaction([
    deleteFavRecipes,
    deleteRecipe,
  ]);
  if (typeof transaction !== 'undefined' && transaction[1]) {
    return true;
  }
}

async function deleteFavouriteRecipe(userId, recipeId) {
  const deleteFavRecipe = await prisma.favourite_recipes.deleteMany({
    where: {
      user_id: userId,
      recipe_id: recipeId,
    },
  });
  if (deleteFavRecipe && deleteFavRecipe.count > 0) {
    return true;
  }
}

async function findRecipes(str) {
  const recipes = await prisma.recipes.findMany({
    where: {
      name: {
        contains: str,
      },
    },
  });
  return recipes;
  //returns array of recipes that contain some string or empty array
}

module.exports = {
  getAllRecipes,
  getAllCategories,
  getUserFavRecipes,
  getRecipe,
  getUserData,
  addUserToDb,
  addRecipeToDb,
  addCategoryToDb,
  addUserFavRecipeToDb,
  deleteRecipe,
  deleteFavouriteRecipe,
  findRecipes,
};
