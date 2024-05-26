const puppeteer = require("puppeteer");
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
  const title = extractText("h1.productName_title", $);

  // Extract the price
  const price = extractPrice("p.productPrice_price", $);

  // Extract the quantity
  const quantity = extractQuantity(
    "button.athenaProductVariations_box[data-selected]",
    $
  );

  // Extract the description
  const description = extractText(
    "div.productDescription_contentProperties p",
    $
  );

  // Extract the image URL
  const imageUrl = extractImageUrl("img.athenaProductImageCarousel_image", $);

  // Set the brand
  const brand = "Myprotein";

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

async function myprotein() {
  // Launch Puppeteer browser
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const promises = myprotein_pages.map(async (pageInfo) => {
    const page = await browser.newPage();
    const data = await fetchAndExtract(page, pageInfo);
    await page.close();
    return data;
  });
  const results = await Promise.all(promises);
  await browser.close();
  return results;
}

module.exports = myprotein;
