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
  const recipes = await addUserToDb('Alice34', 'sdfa@mail.com', 'pass');
  console.log(recipes);
})();

module.exports = {
  getAllRecipes,
  getUserFavRecipes,
  getRecipe,
  addUserToDb,
};
