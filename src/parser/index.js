'use strict';

const infoHandler = require('./handlers/infoHandler');
const saver = require('./handlers/saver');
const beautify = require ('./handlers/beautifier');

(async () => {
  const links = await infoHandler.getLinks();
  const recipes = await infoHandler.getRecipes(links);
  await saver.saveData(beautify.fix(recipes));
})();
