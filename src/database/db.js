'use strict';

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const repositories = require('./repositories');

const prisma = new PrismaClient();

//usage example
(async () => {
  const recipe = new repositories.RecipeRepository(prisma);
  const data = await recipe.findAll();
  console.log(data);
})();
