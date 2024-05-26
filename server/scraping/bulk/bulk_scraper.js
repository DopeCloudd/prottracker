const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");
const cheerio = require("cheerio");
const bulkPages = require("./bulk_pages");

// Use stealth plugin
puppeteer.use(stealthPlugin());

// Helper functions to extract data from the page
const extractText = (selector, $) => $(selector).html().trim();
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

async function fetchAndExtract(page, pageInfo) {
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

  // Extract the title
  const title = extractText(".header-title", $);

  // Extract the price
  const price = extractPrice(".dropin-price--default", $);

  // Extract the quantity
  const quantitySelectors = [
    ".dropin-text-swatch--selected",
    ".dropin-picker__select option:selected",
  ];
  const quantity = extractQuantity($, quantitySelectors);

  // Extract the description
  const description = extractText(".attribute-content p", $);

  // Extract the image URL
  const imageUrl = extractImageUrl(".pdp-carousel__slide--active img", $);

  // Set the brand
  const brand = "Bulk";

  // Set the URL
  const url = pageInfo.url;

  // Set the category ID
  const category = pageInfo.id_category;

  return {
    url,
    title,
    price,
    quantity,
    description,
    brand,
    imageUrl,
    category,
  };
}

async function bulk() {
  // Launch Puppeteer browser
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const promises = bulkPages.map(async (pageInfo) => {
    const page = await browser.newPage();
    const data = await fetchAndExtract(page, pageInfo);
    await page.close();
    return data;
  });
  const results = await Promise.all(promises);
  await browser.close();
  return results;
}

module.exports = bulk;
