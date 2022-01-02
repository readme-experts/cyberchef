'use strict';

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

class PuppeteerHandler {
  constructor() {
    this.browser = null;
  }
  async initBrowser() {
    this.browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
  }
  closeBrowser() {
    this.browser.close();
  }
  async getPageContent(url) {
    if (!this.browser) {
      await this.initBrowser();
    }

    try {
      const page = await this.browser.newPage();
      await page.goto(url, PAGE_PUPPETEER_OPTS);
      const content = await page.content();
      return content;
    } catch (err) {
      throw err;
    }
  }
}


