'use strict';

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getAllRecipes() {
  const allRecipes = await prisma.recipes.findMany();
  return allRecipes; //returns an array of all recipes
}

(async () => {
  await prisma.$connect();
  const recipes = await getAllRecipes();
  console.log(recipes);
})();

