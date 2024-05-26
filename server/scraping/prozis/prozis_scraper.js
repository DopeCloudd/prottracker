const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");
const cheerio = require("cheerio");
const prozis_pages = require("./prozis_pages");

// Use stealth plugin
puppeteer.use(stealthPlugin());

// Helper functions to extract data from the page
const extractText = (selector, $) => {
  const element = $(selector);
  return element.length ? element.text().trim() : "N/A";
};
const extractPrice = (selector, $) => {
  const priceText = $(selector).first().text().trim();
  const price = priceText.replace(/[^\d,.]/g, "");
  return parseFloat(price.replace(",", "."));
};
const extractImageUrl = (selector, $) => $(selector).attr("src");
const extractQuantity = (selector, $) => {
  let element = $(selector);
  element = element.length ? element.text().trim() : "N/A";
  const match = element.match(/\d+.*$/);
  return match ? match[0] : "N/A";
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
  const title = extractText("p.product-name", $);

  // Extract the price
  const price = extractPrice("p.final-price", $);

  // Extract the quantity
  const quantity = extractQuantity("p.product-name", $);

  // Extract the description
  const description = extractText("table div.block02 p.prozis-p", $);

  // Extract the image URL
  const imageUrl = extractImageUrl("div.main-block picture img", $);

  // Set the brand
  const brand = "Prozis";

  // Set the URL
  const url = pageInfo.url;

  // Set the category id
  const categoryId = pageInfo.id_category;

  return {
    url,
    title,
    price,
    quantity,
    description,
    brand,
    imageUrl,
    categoryId,
  };
}

async function prozis() {
  // Launch Puppeteer browser
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const promises = prozis_pages.map(async (pageInfo) => {
    const page = await browser.newPage();
    const data = await fetchAndExtract(page, pageInfo);
    await page.close();
    return data;
  });
  const results = await Promise.all(promises);
  await browser.close();
  return results;
}

module.exports = prozis;
