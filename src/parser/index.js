'use strict';

const fs = require('fs');
const cheerio = require('cheerio');
const pupp = require('./helpers/puppeteer');
const common = require('./helpers/common');
const SITE = 'https://www.povarenok.ru/recipes/';
const pages = 1;

(async function main() {
  const links = [];
  try {
    for (const page of common.arrayFromLength(pages)) {
      const defaultURL = `${SITE}~${page}`;
      const pageContent = await pupp.getPageContent(defaultURL);
      //console.log(pageContent);
      const $ = cheerio.load(pageContent);
      $('.desktop-img').each((i, header) => {
        const currentURL = $(header).find('a').attr('href');
        links.push(currentURL);
      });
      //await listItemsHandler.receiveData(items);
    }

    const recipes = [];

    for (const link of links) {
      // const testLink = 'https://www.povarenok.ru/recipes/show/174588/';
      const testPageContent = await pupp.getPageContent(link);
      const $1 = cheerio.load(testPageContent);

      const name = $1('h1').text();

      // eslint-disable-next-line camelcase
      const image_link = $1('.m-img')
        .find('img[itemprop="image"]')
        .attr('src');

      const ingredients = [];
      $1('span[itemprop="ingredient"]')
        .each((i, header) => {
          const name = $1(header)
            .find('span[itemprop="name"]')
            .html();
          const mass = $1(header)
            .find('span[itemprop="amount"]')
            .html();

          let ingredient = name;
          mass ? ingredient = name + ' - ' + mass : ingredient = name;

          ingredients.push(ingredient);
        });
      const products = ingredients.join('\n');

      // eslint-disable-next-line camelcase
      const category_id = $1('.article-breadcrumbs')
        .find('a')
        .first()
        .text()
        .trim();

      const steps = [];
      $1('.cooking-bl').each((step, header) => {
        const text = $1(header)
          .find('p')
          .text();

        steps.push(`${step + 1}. ${text}`);
      });
      const description = steps.join('\n');

      const recipe = {
        name,
        category_id,
        products,
        description,
        image_link,
      };

      recipes.push(recipe);
      console.log(`Added ${links.indexOf(link) + 1}/${links.length} recipes`);
    }

    console.log(recipes);
    const json = JSON.stringify(recipes);

    fs.writeFile('./recipes.json', json, err => {
      if (err) {
        return console.log(err);
      }
      console.log('The file was saved!');
    });
  } catch (err) {
    console.log(err);
  }
})();
