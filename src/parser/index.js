'use strict';

const cheerio = require('cheerio');
//const chalk = require('chalk');
const pupp = require('./helpers/puppeteer');
const common = require('./helpers/common');
//const listItemsHandler = require('./handlers/listItemsHandler');
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
    console.log(links);
  } catch (err) {
    console.log(chalk.red('An error has occured \n'));
    console.log(err);
  }
})();
