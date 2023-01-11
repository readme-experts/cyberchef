'use strict';

const cheerio = require('cheerio');
const pupp = require('../helpers/puppeteer');
const SITE = 'https://www.povarenok.ru/recipes/';
const pages = 1;

async function getLinks() {
  try {
    const links = [];
    for (let page = 1; page <= pages; page++) {
      const defaultURL = `${SITE}~${page}`;
      const pageContent = await pupp.getPageContent(defaultURL);
      const $ = cheerio.load(pageContent);
      $('.desktop-img').each((i, header) => {
        const currentURL = $(header).find('a').attr('href');
        links.push(currentURL);
      });
    }
    return links;
  } catch (err) {
    console.log(err);
  }
}

async function getRecipes(links) {
  try {
    const recipes = [];
    for (const link of links) {
      const pageContent = await pupp.getPageContent(link);
      const $ = cheerio.load(pageContent);

      const name = $('h1').text();

      const imageLink = $('.m-img')
        .find('img[itemprop="image"]')
        .attr('src');

      const ingredients = [];
      $('span[itemprop="ingredient"]')
        .each((i, header) => {
          const name = $(header)
            .find('span[itemprop="name"]')
            .html();
          const mass = $(header)
            .find('span[itemprop="amount"]')
            .html();

          let ingredient = mass ? name + ' - ' + mass : name

          ingredients.push(ingredient);
        });
      const products = ingredients.join('\n');

      const categoryId = $('.article-breadcrumbs')
        .find('a')
        .first()
        .text()
        .trim();

      const steps = [];
      $('.cooking-bl').each((step, header) => {
        const text = $(header)
          .find('p')
          .text();

        steps.push(`${step + 1}. ${text}`);
      });
      const description = steps.join('\n');

      const recipe = {
        name,
        categoryId,
        products,
        description,
        imageLink,
      };

      recipes.push(recipe);
      // console.log(
      //   `Added ${links.indexOf(link) + 1}/${links.length} recipes`
      // );
    }
    return recipes;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getLinks,
  getRecipes,
};


