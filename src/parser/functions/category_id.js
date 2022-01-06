'use strict';

const pupp = require('../helpers/puppeteer');
const cheerio = require('cheerio');

const exports = module.exports = {};

exports.getCategory = async function(link) {
  const testPageContent = await pupp.getPageContent(link);
  const $ = cheerio.load(testPageContent);

  const category_id = $('.article-breadcrumbs')
    .find('a')
    .first()
    .text()
    .trim();
  return category_id;
};

