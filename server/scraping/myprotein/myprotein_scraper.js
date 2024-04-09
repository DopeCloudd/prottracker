const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const myprotein_pages = require('./myprotein_pages');

puppeteer.use(StealthPlugin());

async function myproteinScraping() {

    const buttonCookies = '#onetrust-accept-btn-handler';

    try {
        const browser = await puppeteer.launch({
            headless: true,
            userDataDir: './puppeteerProfile'
        });
        const scrapePage = async (url, buttonSelector, priceSelector, titleSelector, descriptionSelector, quantitySelector, selectValue, additionalData) => {
            const page = await browser.newPage();

            await page.setRequestInterception(true);
            page.on('request', (req) => {
                if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
                    req.abort();
                } else {
                    req.continue();
                }
            });

            await page.setViewport({width: 1080, height: 1024});
            await page.goto(url);

            try {
                await page.waitForSelector(buttonCookies, {timeout: 1500});
                await page.click(buttonCookies);
            } catch (e) {
                console.log('No cookies');
            }

            try {
                const ariaExpandedValue = await page.evaluate(() => {
                    const button = document.querySelector('#product-description-heading-lg-2');
                    return button ? button.getAttribute('aria-expanded') : null;
                });
                if (ariaExpandedValue === 'false') {
                    const button = await page.$('#product-description-heading-lg-2');
                    await button.click();
                }
                await page.waitForSelector(descriptionSelector, {visible: true});
            } catch (e) {
                console.log(e);
            }

            // Extract data
            const data = await page.evaluate((priceSel, titleSel, descSel, quantitySel) => {
                const extractPrice = (selector) => {
                    const element = document.querySelector(selector);
                    if (!element) {
                        return null;
                    }
                    // Extract the text and trim it
                    let priceText = element.innerText.trim();

                    // Remove currency symbol
                    priceText = priceText.replace('€', '').trim();

                    // Replace comma with dot if it's used as a decimal separator
                    priceText = priceText.replace(',', '.');

                    return parseFloat(priceText);
                };
                const extractText = (selector) => {
                    const element = document.querySelector(selector);
                    return element ? element.innerText.trim() : null;
                };

                const extractQuantity = (selector) => {
                    const element = document.querySelector(selector);
                    if (!element) return null;
                    return element.childNodes[0].nodeValue.trim();
                };

                return {
                    price: extractPrice(priceSel),
                    title: extractText(titleSel),
                    description: extractText(descSel),
                    quantity: extractQuantity(quantitySel)
                };
            }, priceSelector, titleSelector, descriptionSelector, quantitySelector);

            await page.close();
            // Combine the scraped data with the additionalData
            return {...data, ...additionalData, url: url};
        };

        // Define selectors for each product
        const selectors = {
            Whey: {
                buttonSelector: "div[aria-label='Quantité'] li.athenaProductVariations_listItem button[data-option-id='5859']",
                priceSelector: "p[data-product-price='price']",
                titleSelector: "h1[data-product-name='title']",
                descriptionSelector: "#product-description-content-lg-2 p",
                quantitySelector: "div[aria-label='Quantité'] li.athenaProductVariations_listItem button[data-option-id='5859']",
                additionalData: {
                    image: './myprotein/image/myprotein_whey.png',
                    id_category: 1,
                    brand: 'Myprotein'
                }
            },
            Pure_Whey_Isolate: {
                buttonSelector: "button.athenaProductVariations_box.default.athenaProductVariationsOption[data-selected]",
                priceSelector: "p[data-product-price='price']",
                titleSelector: "h1[data-product-name='title']",
                descriptionSelector: "#product-description-content-lg-2 p",
                quantitySelector: "button.athenaProductVariations_box.default.athenaProductVariationsOption[data-selected]",
                additionalData: {
                    image: './myprotein/image/myprotein_isolate.png',
                    id_category: 1,
                    brand: 'Myprotein'
                }
            },
            Clear_Whey_Isolate: {
                buttonSelector: "button.athenaProductVariations_box.default.athenaProductVariationsOption[data-selected]",
                priceSelector: "p[data-product-price='price']",
                titleSelector: "h1[data-product-name='title']",
                descriptionSelector: "#product-description-content-lg-2 p",
                quantitySelector: "button.athenaProductVariations_box.default.athenaProductVariationsOption[data-selected]",
                additionalData: {
                    image: './myprotein/image/myprotein_clear.png',
                    id_category: 2,
                    brand: 'Myprotein'
                }
            },
            Gainer_Prise_De_Masse: {
                buttonSelector: "button.athenaProductVariations_box.default.athenaProductVariationsOption[data-selected]",
                priceSelector: "p[data-product-price='price']",
                titleSelector: "h1[data-product-name='title']",
                descriptionSelector: "#product-description-content-lg-2 p",
                quantitySelector: "button.athenaProductVariations_box.default.athenaProductVariationsOption[data-selected]",
                additionalData: {
                    image: './myprotein/image/myprotein_gainer.png',
                    id_category: 3,
                    brand: 'Myprotein'
                }
            },
            Pre_Workout: {
                buttonSelector: "button.athenaProductVariations_box.default.athenaProductVariationsOption[data-selected]",
                priceSelector: "p[data-product-price='price']",
                titleSelector: "h1[data-product-name='title']",
                descriptionSelector: "#product-description-content-lg-2 p",
                quantitySelector: "button.athenaProductVariations_box.default.athenaProductVariationsOption[data-selected]",
                additionalData: {
                    image: './myprotein/image/myprotein_alpha.png',
                    id_category: 5,
                    brand: 'Myprotein'
                }
            },
        };

        // Concurrently scrape all pages
        const pagesData = await Promise.all(
            Object.entries(myprotein_pages).map(([key, url]) => {
                const sels = selectors[key];
                return scrapePage(url, sels.buttonSelector, sels.priceSelector, sels.titleSelector, sels.descriptionSelector, sels.quantitySelector, sels.selectValue, sels.additionalData);
            })
        );

        await browser.close();
        return pagesData;

    } catch (error) {
        console.error("Error during scraping:", error.message);
    }
}

// Exporting the function, not its result
module.exports = myproteinScraping;