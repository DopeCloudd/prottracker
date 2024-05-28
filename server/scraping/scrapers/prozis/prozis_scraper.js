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

  // Extract the title
  const title = extractText("p.product-name", $);

  // Extract the price
  const price = extractPrice("p.final-price", $);

  // Extract the quantity
  const quantity = extractQuantity("p.product-name", $);

  // Extract the description
  const descriptions = [
    "div#description div.block02 h6",
    "div#description div.block04 h4",
  ];
  const description = extractDescription(descriptions, $);

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

async function prozis(browser) {
  const promises = prozis_pages.map(async (pageInfo) => {
    const page = await browser.newPage();
    const data = await fetchAndExtract(page, pageInfo);
    await page.close();
    return data;
  });
  const results = await Promise.all(promises);
  return results;
}

module.exports = prozis;
