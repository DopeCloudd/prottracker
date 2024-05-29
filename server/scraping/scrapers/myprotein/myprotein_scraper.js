const cheerio = require("cheerio");
const myprotein_pages = require("./myprotein_pages");

// Helper functions to extract data from the page
const extractText = (selector, $) => $(selector).html().trim();
const extractPrice = (selector, $) => {
  const priceText = $(selector).text().trim();
  const price = priceText.replace(/[^\d,.]/g, "");
  return parseFloat(price.replace(",", "."));
};
const extractImageUrl = (selector, $) => $(selector).attr("src");
const extractQuantity = (selector, $) => {
  const element = $(selector);
  return element.length
    ? element
        .contents()
        .filter(function () {
          return this.type === "text";
        })
        .first()
        .text()
        .trim()
    : null;
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

  // Initialize the result object
  const result = {};
  // Get the selectors
  const selectors = pageInfo.selectors;

  // Extract the title
  if (config.title) {
    result.title = extractText(selectors.title, $);
  }

  // Extract the price
  if (config.price) {
    result.price = extractPrice(selectors.price, $);
  }

  // Extract the quantity
  if (config.quantity) {
    result.quantity = extractQuantity(selectors.quantity, $);
  }

  // Extract the description
  if (config.description) {
    result.description = extractText(selectors.description, $);
  }

  // Extract the image URL
  if (config.imageUrl) {
    result.imageUrl = extractImageUrl(selectors.imageUrl, $);
  }

  // Set the brand
  if (config.brand) {
    result.brand = "Myprotein";
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

async function myprotein(browser, config) {
  const promises = myprotein_pages.map(async (pageInfo) => {
    const page = await browser.newPage();
    const data = await fetchAndExtract(page, pageInfo, config);
    await page.close();
    return data;
  });
  const results = await Promise.all(promises);
  return results;
}

module.exports = myprotein;
