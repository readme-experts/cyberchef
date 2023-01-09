'use strict';

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addUserToDb(username, email, passwordhash) {
  const user = await prisma.users.create({
    data: {
      email: email,
      username: username,
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
      name: name,
      category_id: categoryId,
      products: products,
      description: description,
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
      name: name
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
      recipe_id: recipeId
    },
  });
  if (typeof favRecipe !== 'undefined' && favRecipe) {
    return true;
  }
}

async function getRecipe(recipeId) {
  const recipe = await prisma.recipes.findUnique({
    where: {
      id: recipeId,
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
      user_id: userId,
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
      username: username,
    },
  });
  return user; //returns user object
}

(async () => {
  await prisma.$connect();
  const data = await addUserFavRecipeToDb(13, 5);
  console.log(data);
})();

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
};
