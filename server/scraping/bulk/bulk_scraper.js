const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const bulk_pages = require('./bulk_pages');

puppeteer.use(StealthPlugin());

async function bulkScraping() {

    const buttonCookies = '#amgdprcookie-accept-btn';

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

            // Click the specified button or select an option
            if (buttonSelector) {
                await page.evaluate((selector) => {
                    document.querySelector(selector).click();
                }, buttonSelector);
            } else if (selectValue) {
                await page.select(quantitySelector, selectValue);
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
                    // If it's a select dropdown, return the text of the selected option.
                    if (element.tagName.toLowerCase() === 'select') {
                        const selectedOption = element.options[element.selectedIndex];
                        return selectedOption ? selectedOption.text.trim() : null;
                    }
                    // If it's a button or another element, return its aria-label or innerText.
                    return element.ariaLabel || element.innerText.trim();
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
                buttonSelector: "#option-label-bp_size-179-item-25",
                priceSelector: "span[data-price-type='finalPrice'] span.price",
                titleSelector: "span[data-ui-id='page-title-wrapper']",
                descriptionSelector: "#description p",
                quantitySelector: "#option-label-bp_size-179-item-25",
                additionalData: {
                    image: './bulk/image/bulk_whey.png',
                    id_category: 1,
                    brand: 'Bulk'
                }
            },
            Pure_Whey_Isolate: {
                buttonSelector: "#option-label-bp_size-179-item-25",
                priceSelector: "span[data-price-type='finalPrice'] span.price",
                titleSelector: "span[data-ui-id='page-title-wrapper']",
                descriptionSelector: "#description p",
                quantitySelector: "#option-label-bp_size-179-item-25",
                additionalData: {
                    image: './bulk/image/bulk_isolate.png',
                    id_category: 1,
                    brand: 'Bulk'
                }
            },
            Clear_Whey_Isolate: {
                buttonSelector: "#option-label-bp_size-179-item-25",
                priceSelector: "span[data-price-type='finalPrice'] span.price",
                titleSelector: "span[data-ui-id='page-title-wrapper']",
                descriptionSelector: "#description p",
                quantitySelector: "#option-label-bp_size-179-item-25",
                additionalData: {
                    image: './bulk/image/bulk_clear.png',
                    id_category: 2,
                    brand: 'Bulk'
                }
            },
            Gainer_Prise_De_Masse: {
                buttonSelector: "#option-label-bp_size-179-item-25",
                priceSelector: "span[data-price-type='finalPrice'] span.price",
                titleSelector: "span[data-ui-id='page-title-wrapper']",
                descriptionSelector: "#description p",
                quantitySelector: "#option-label-bp_size-179-item-25",
                additionalData: {
                    image: './bulk/image/bulk_gainer.png',
                    id_category: 3,
                    brand: 'Bulk'
                }
            },
            Creatine_Monohydrate: {
                buttonSelector: "#option-label-bp_size-179-item-17371",
                priceSelector: "span[data-price-type='finalPrice'] span.price",
                titleSelector: "span[data-ui-id='page-title-wrapper']",
                descriptionSelector: "#description p",
                quantitySelector: "#option-label-bp_size-179-item-17371",
                additionalData: {
                    image: './bulk/image/bulk_monohydrate.png',
                    id_category: 4,
                    brand: 'Bulk'
                }
            },
            Creatine_Creapure: {
                buttonSelector: "#option-label-bp_size-179-item-17371",
                priceSelector: "span.price",
                titleSelector: "span[data-ui-id='page-title-wrapper']",
                descriptionSelector: "#description p",
                quantitySelector: "#option-label-bp_size-179-item-17371",
                additionalData: {
                    image: './bulk/image/bulk_creapure.png',
                    id_category: 4,
                    brand: 'Bulk'
                }
            },
            Multivitamines: {
                selectValue: '17361',
                priceSelector: "span[data-price-type='finalPrice'] span.price",
                titleSelector: "span[data-ui-id='page-title-wrapper']",
                descriptionSelector: "#description p",
                quantitySelector: "#attribute205",
                additionalData: {
                    image: './bulk/image/bulk_multivitamines.png',
                    id_category: 6,
                    brand: 'Bulk'
                }
            },
            Multivitamines_et_mineraux: {
                selectValue: '17361',
                priceSelector: "span[data-price-type='finalPrice'] span.price",
                titleSelector: "span[data-ui-id='page-title-wrapper']",
                descriptionSelector: "#description p",
                quantitySelector: "#attribute205",
                additionalData: {
                    image: './bulk/image/bulk_mineraux.png',
                    id_category: 6,
                    brand: 'Bulk'
                }
            },
        };

        // Concurrently scrape all pages
        const pagesData = await Promise.all(
            Object.entries(bulk_pages).map(([key, url]) => {
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
module.exports = bulkScraping;