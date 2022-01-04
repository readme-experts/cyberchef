'use strict';

const cheerio = require('cheerio');
const chalk = require('chalk');
const pupp = require('./helpers/puppeteer');
const common = require('./helpers/common');

const SITE = 'https://www.povarenok.ru/recipes/';
const pages = 2;
(async function main() {
  try {
    for (const page of common.arrayFromLength(pages)) {
      const url = `${SITE}~${page}`;
      const pageContent = await pupp.getPageContent(url);
      //console.log(pageContent);
      const $ = cheerio.load(pageContent);
      const items = [];

      $('.desktop-img').each((i, header) => {
        const url = $(header).find('a').attr('href');

        items.push({
          url,
        });
      });
      console.log(items);
    }
  } catch (err) {
    console.log(chalk.red('An error has occured \n'));
    console.log(err);
  }
})();
