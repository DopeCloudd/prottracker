const cheerio = require("cheerio");
const eafit_pages = require("./eafit_pages");

// Helper functions to extract data from the page
const extractText = (selector, $) => {
  const element = $(selector);
  return element.length ? element.attr("content") : "N/A";
};
const extractPrice = (selector, $) => {
  const element = $(selector);
  const content = element.attr("content");
  const price = parseFloat(content);
  return isNaN(price) ? "N/A" : price;
};
const extractDescription = (selector, $) => {
  let title = $(selector + " h2").first();
  title = title.length ? title.text().trim() + "\n" : "";
  let content = $(selector + " p");
  content = content.length ? content.text().trim() : "";
  return title + content;
};
const extractImageUrl = (selector, $) => {
  const element = $(selector);
  return element.length ? element.attr("content") : "N/A";
};
const extractQuantity = (selector, $) => {
  let element = $(selector);
  element = element.length ? element.text().trim() : "N/A";
  const match = element.match(/\d+\s?[a-zA-Z]+/);
  return match ? match[0] : "N/A";
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

  // Set the user agent
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );

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
    result.description = extractDescription(selectors.description, $);
  }

  // Extract the image URL
  if (config.imageUrl) {
    result.imageUrl = extractImageUrl(selectors.imageUrl, $);
  }

  // Set the brand
  if (config.brand) {
    result.brand = "Eafit";
  }

  // Set the URL
  if (config.url) {
    result.url = pageInfo.url;
  }

  // Set the category ID
  if (config.category) {
    result.category = pageInfo.id_category;
  }

  // Return the result object
  return result;
}

async function eafit(browser, config) {
  const promises = eafit_pages.map(async (pageInfo) => {
    const page = await browser.newPage();
    const data = await fetchAndExtract(page, pageInfo, config);
    await page.close();
    return data;
  });
  const results = await Promise.all(promises);
  return results;
}

module.exports = eafit;
