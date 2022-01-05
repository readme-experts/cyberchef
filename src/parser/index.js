'use strict';

const cheerio = require('cheerio');
// const chalk = require('chalk');
const pupp = require('./helpers/puppeteer');
const common = require('./helpers/common');
// const listItemsHandler = require('./handlers/listItemsHandler');
const SITE = 'https://www.povarenok.ru/recipes/';
const pages = 3;

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
    // should do: name, imageLink, ingredients, description, category
    const testLink = 'https://www.povarenok.ru/recipes/show/174588/';
    const testPageContent = await pupp.getPageContent(testLink);
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

    console.log(name + '\n' + image_link + '\n' + products);

  } catch (err) {
    console.log(chalk.red('An error has occured \n'));
    console.log(err);
  }
})();
