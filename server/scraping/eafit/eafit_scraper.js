const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");
const cheerio = require("cheerio");
const eafit_pages = require("./eafit_pages");

// Use stealth plugin
puppeteer.use(stealthPlugin());

// Helper functions to extract data from the page
const extractText = (selector, $) => {
  const element = $(selector);
  return element.length ? element.html().trim() : "N/A";
};
const extractDescription = (selector, $) => {
  let title = $(selector + " h2").first();
  title = title.length ? title.text().trim() + "\n" : "";
  const pElements = [];
  let nextElement = $(selector + " h2")
    .first()
    .next();
  while (nextElement.length && nextElement[0].tagName !== "hr") {
    if (nextElement[0].tagName === "p") {
      pElements.push(nextElement.text().trim());
    }
    nextElement = nextElement.next();
  }
  return title + pElements.join("\n");
};
const extractImageUrl = (selector, $) => {
  const element = $(selector);
  return element.length ? element.attr("src") : "N/A";
};
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
  const title = extractText('[data-ui-id="page-title-wrapper"]', $);

  // Extract the price
  const price =
    parseFloat($('meta[property="product:price:amount"]').attr("content")) ||
    "N/A";

  // Extract the quantity
  const quantity = extractQuantity('[data-ui-id="page-title-wrapper"]', $);

  // Extract the description
  const description = extractDescription(
    "div.product.attribute.description",
    $
  );

  // Extract the image URL
  const imageUrl = extractImageUrl("img.amasty-main-image", $);

  // Set the brand
  const brand = "Eafit";

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

async function eafit() {
  // Launch Puppeteer browser
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const promises = eafit_pages.map(async (pageInfo) => {
    const page = await browser.newPage();
    const data = await fetchAndExtract(page, pageInfo);
    await page.close();
    return data;
  });
  const results = await Promise.all(promises);
  await browser.close();
  return results;
}

module.exports = eafit;
