'use strict';

const cheerio = require('cheerio');
const chalk = require('chalk');

import {getPageContent} from './helpers/puppeteer';

const SITE = 'https://www.povarenok.ru/recipes/show/';
let page = 100000;
(async function main() {
  try {
    for (;page < 100100; page++) {
      const url = `${SITE}${page}`;
      const pageContent = await getPageContent(url);//function is not ready yet
    }
  } catch (err){
    console.log(chalk.red('An error has occured \n'));
    console.log(err);
  }
})();
