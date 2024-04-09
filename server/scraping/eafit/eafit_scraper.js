const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const eafit_pages = require('./eafit_pages');

puppeteer.use(StealthPlugin());

async function eafitScraping() {

    const buttonCookies = '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll';

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
                    // Check if selector starts with '#'
                    if (selector.startsWith('#')) {
                        const element = document.querySelector(selector);
                        if (!element) {
                            return null;
                        }
                        // If it's a select dropdown, return the text of the selected option.
                        if (element.tagName.toLowerCase() === 'select') {
                            const selectedOption = element.options[element.selectedIndex];
                            return selectedOption ? selectedOption.text.trim() : null;
                        }
                    } else {
                        // If selector doesn't start with '#', return the selector itself
                        return selector;
                    }
                };

                return {
                    price: extractPrice(priceSel),
                    title: extractText(titleSel),
                    description: extractText(descSel),
                    quantity: extractQuantity(quantitySel)
                };
            }, priceSelector, titleSelector, descriptionSelector, quantitySelector);

            await page.close();
            return {...data, ...additionalData, url: url};
        };

        // Define selectors for each product
        const selectors = {
            Whey: {
                priceSelector: "span.price-wrapper span.price",
                titleSelector: "h1.page-title",
                descriptionSelector: "div.value p",
                quantitySelector: "#attribute154",
                additionalData: {
                    image: './eafit/image/eafit_whey.png',
                    id_category: 1,
                    brand: 'Eafit'
                }
            },
            Pure_Whey_Isolate: {
                priceSelector: "span.price-wrapper span.price",
                titleSelector: "h1.page-title",
                descriptionSelector: "div.value p",
                quantitySelector: "750g",
                additionalData: {
                    image: './eafit/image/eafit_isolate.png',
                    id_category: 1,
                    brand: 'Eafit'
                }
            },
            Micellaire: {
                priceSelector: "span.price-wrapper span.price",
                titleSelector: "h1.page-title",
                descriptionSelector: "div.value p",
                quantitySelector: "#attribute154",
                additionalData: {
                    image: './eafit/image/eafit_micellaire.png',
                    id_category: 1,
                    brand: 'Eafit'
                }
            },
            Gainer_Prise_De_Masse: {
                priceSelector: "span.price-wrapper span.price",
                titleSelector: "h1.page-title",
                descriptionSelector: "div.value p",
                quantitySelector: "#attribute154",
                additionalData: {
                    image: './eafit/image/eafit_gainer.png',
                    id_category: 3,
                    brand: 'Eafit'
                }
            },
            Pre_Workout: {
                priceSelector: "span.price-wrapper span.price",
                titleSelector: "h1.page-title",
                descriptionSelector: "div.value p",
                quantitySelector: "330g",
                additionalData: {
                    image: './eafit/image/eafit_pre.png',
                    id_category: 5,
                    brand: 'Eafit'
                }
            },
        };

        // Concurrently scrape all pages
        const pagesData = await Promise.all(
            Object.entries(eafit_pages).map(([key, url]) => {
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

module.exports = eafitScraping;
