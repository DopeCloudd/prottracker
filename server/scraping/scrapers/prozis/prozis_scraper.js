const cheerio = require("cheerio");
const prozis_pages = require("./prozis_pages");

// Helper functions to extract data from the page
const extractText = (selector, $) => {
  const element = $(selector);
  return element.length ? element.text().trim() : "N/A";
};
const extractPrice = (selector, $) => {
  const priceText = $(selector).first().text().trim();
  const price = parseFloat(priceText.replace(/[^\d,.]/g, "").replace(",", "."));
  return isNaN(price) ? "N/A" : price;
};
const extractDescription = (selectors, $) => {
  let description = "";
  for (const selector of selectors) {
    const title = $(selector);
    const content = title.next();
    if (title.length && content.length) {
      description = `${title.text().trim()}\n${content.text().trim()}`;
      break;
    }
  }
  return description;
};
const extractImageUrl = (selector, $) => $(selector).attr("src");
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

  // Navigate to the URL
  await page.goto(pageInfo.url, { waitUntil: "networkidle2" });

  await page.evaluate(() => {
    const spans = Array.from(document.querySelectorAll("span"));
    const targetSpan = spans.find(
      (span) => span.textContent.trim() === "Descriptif"
    );
    if (targetSpan) {
      targetSpan.click();
    }
  });

  await page.waitForTimeout(3000);

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
    result.brand = "Prozis";
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

async function prozis(browser, config) {
  const promises = prozis_pages.map(async (pageInfo) => {
    const page = await browser.newPage();
    const data = await fetchAndExtract(page, pageInfo, config);
    await page.close();
    return data;
  });
  const results = await Promise.all(promises);
  return results;
}

module.exports = prozis;
