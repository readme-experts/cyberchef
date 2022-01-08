'use strict';

const cheerio = require('cheerio');
const pupp = require('../helpers/puppeteer');
const common = require('../helpers/common');
const SITE = 'https://www.povarenok.ru/recipes/';
const pages = 1;

async function getLinks() {
  try {
    const links = [];
    for (const page of common.arrayFromLength(pages)) {
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

module.exports = {
  getLinks,
};


