'use strict';

const infoHandler = require('./handlers/infoHandler');
const saver = require('./handlers/saver');

(async () => {
  const links = await infoHandler.getLinks();
  const recipes = await infoHandler.getRecipes(links);
  await saver.saveData(recipes);
})();
