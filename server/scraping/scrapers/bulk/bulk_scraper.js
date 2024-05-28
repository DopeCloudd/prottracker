const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");
const cheerio = require("cheerio");
const bulkPages = require("./bulk_pages");

// Use stealth plugin
puppeteer.use(stealthPlugin());

// Helper functions to extract data from the page
const extractText = (selector, $) => {
  const element = $(selector);
  return element.length ? element.html().trim() : "N/A";
};
const extractPrice = (selector, $) => {
  const priceText = $(selector).text().trim();
  const price = priceText.replace(/[^\d,.]/g, "");
  return parseFloat(price.replace(",", "."));
};
const extractImageUrl = (selector, $) => $(selector).attr("src");
const extractQuantity = ($, selectors) => {
  for (const selector of selectors) {
    const quantityText = $(selector).text().trim();
    if (quantityText) {
      return quantityText;
    }
  }
  return "N/A";
};

async function fetchAndExtract(page, pageInfo, config) {
  // Enable request interception
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (["image", "stylesheet", "font"].includes(req.resourceType())) {
      req.abort();
    } else {
      req.continue();
    }
  });

  // Navigate to the URL
  await page.goto(pageInfo.url, { waitUntil: "networkidle2" });

  // Get the HTML content of the page
  const content = await page.content();

  // Load the HTML content into cheerio
  const $ = cheerio.load(content);

  const result = {};

  // Extract the title
  if (config.title) {
    result.title = extractText(".header-title", $);
  }

  // Extract the price
  if (config.price) {
    result.price = extractPrice(".dropin-price--default", $);
  }

  // Extract the quantity
  if (config.quantity) {
    const quantitySelectors = [
      ".dropin-text-swatch--selected",
      ".dropin-picker__select option:selected",
    ];
    result.quantity = extractQuantity($, quantitySelectors);
  }

  // Extract the description
  if (config.description) {
    result.description = extractText(".attribute-content p", $);
  }

  // Extract the image URL
  if (config.imageUrl) {
    result.imageUrl = extractImageUrl(".pdp-carousel__slide--active img", $);
  }

  // Set the brand
  if (config.brand) {
    result.brand = "Bulk";
  }

  // Set the URL
  if (config.url) {
    result.url = pageInfo.url;
  }

  // Set the category ID
  if (config.category) {
    result.category = pageInfo.id_category;
  }

  return result;
}

async function bulk(browser, config) {
  const promises = bulkPages.map(async (pageInfo) => {
    const page = await browser.newPage();
    const data = await fetchAndExtract(page, pageInfo, config);
    await page.close();
    return data;
  });
  const results = await Promise.all(promises);
  return results;
}

module.exports = bulk;
