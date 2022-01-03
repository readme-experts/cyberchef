'use strict';

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const SITE = 'https://www.povarenok.ru/recipes/show/';
const page = 100000;

