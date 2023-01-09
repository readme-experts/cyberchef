'use strict';

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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
  favRecipes = favRecipes.map(el => el.recipe_id);
  return favRecipes; //returns an array user favourite recipes ids
}

(async () => {
  await prisma.$connect();
  const recipes = await getUserFavRecipes(3);
  console.log(recipes);
})();

module.exports = {
  getAllRecipes,
  getUserFavRecipes,
};
