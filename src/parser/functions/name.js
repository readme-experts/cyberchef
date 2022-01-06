'use strict';

const pupp = require('../helpers/puppeteer');
const cheerio = require('cheerio');

const exports = module.exports = {};

exports.getName = async function(link) {
  const testPageContent = await pupp.getPageContent(link);
  const $ = cheerio.load(testPageContent);

  const name = $('h1').text();
  return name;
};

