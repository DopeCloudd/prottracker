const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const prozis_pages = require('./prozis_pages');

puppeteer.use(StealthPlugin());

async function prozisScraping() {

    const buttonCookies = '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll';

    try {
        const browser = await puppeteer.launch({
            headless: true,
            userDataDir: './puppeteerProfile'
        });
        const scrapePage = async (url, buttonSelector, priceSelector, titleSelector, descriptionSelector, quantitySelector, selectValue, additionalData) => {
            const page = await browser.newPage();

            await page.setViewport({width: 1080, height: 1024});
            await page.goto(url, {waitUntil: 'networkidle0'});

            try {
                await page.waitForSelector(buttonCookies, {timeout: 1500});
                await page.click(buttonCookies);
            } catch (e) {
                console.log('No cookies');
            }

            // Click the button to reveal the description
            try {
                await page.waitForSelector("#pdpFirstRow div.prz-blk.prz-mob-grd.prz-mob-grd-no-margins.pdp-block-horizontal:last-child");
                await page.click("#pdpFirstRow div.prz-blk.prz-mob-grd.prz-mob-grd-no-margins.pdp-block-horizontal:last-child");
                await page.waitForSelector(descriptionSelector, {visible: true});
            } catch (e) {
                console.error(e);
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
                    if (!element) {
                        return null;
                    }
                    return element.innerText.trim();
                };

                const extractQuantity = (selector) => {
                    if (selector.startsWith('div')) {
                        const element = document.querySelector(selector);
                        if (!element) {
                            return null;
                        }
                        return element.innerText.trim();
                    } else {
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
            // Combine the scraped data with the additionalData
            return {...data, ...additionalData, url: url};
        };

        // Define selectors for each product
        const selectors = {
            Whey: {
                priceSelector: "p.final-price",
                titleSelector: "h1.product-name",
                descriptionSelector: "#ele-pdp-description div.block02 p.prozis-p.twhite.mt20",
                quantitySelector: "div.option-button-container.primary-btn.order-1 span.option",
                additionalData: {
                    image: './prozis/image/prozis_whey.png',
                    id_category: 1,
                    brand: 'Prozis'
                }
            },
            Pure_Whey_Isolate: {
                priceSelector: "p.final-price",
                titleSelector: "h1.product-name",
                descriptionSelector: "#ele-pdp-description div.block02 p.prozis-p.tgrey.mt60",
                quantitySelector: "div.option-button-container.primary-btn.order-1 span.option",
                additionalData: {
                    image: './prozis/image/prozis_isolate.png',
                    id_category: 1,
                    brand: 'Prozis'
                }
            },
            Gainer_Prise_De_Masse: {
                priceSelector: "p.final-price",
                titleSelector: "h1.product-name",
                descriptionSelector: "#ele-pdp-description div.block02 p.prozis-p.twhite.mt20",
                quantitySelector: "div.option-button-container.primary-btn.order-1 span.option",
                additionalData: {
                    image: './prozis/image/prozis_gainer.png',
                    id_category: 3,
                    brand: 'Prozis'
                }
            },
            Big_Shot: {
                priceSelector: "p.final-price",
                titleSelector: "h1.product-name",
                descriptionSelector: "#ele-pdp-description div.block04 p.prozis-p.twhite.mt20",
                quantitySelector: "div.option-button-container.primary-btn.order-1 span.option",
                additionalData: {
                    image: './prozis/image/prozis_big_shot.png',
                    id_category: 5,
                    brand: 'Prozis'
                }
            },
            Ripped: {
                priceSelector: "p.final-price",
                titleSelector: "h1.product-name",
                descriptionSelector: "#ele-pdp-description div.block06 p.prozis-p.tgrey.mt20.zeropadding",
                quantitySelector: "46 portions",
                additionalData: {
                    image: './prozis/image/prozis_ripped.png',
                    id_category: 5,
                    brand: 'Prozis'
                }
            },
        };

        // Concurrently scrape all pages
        const pagesData = await Promise.all(
            Object.entries(prozis_pages).map(([key, url]) => {
                const sels = selectors[key];
                return scrapePage(url, sels.buttonSelector, sels.priceSelector, sels.titleSelector, sels.descriptionSelector, sels.quantitySelector, sels.selectValue, sels.additionalData);
            })
        );

        await browser.close();
        return pagesData;

    } catch (error) {
        console.error(error);
        console.error("Error during scraping:", error.message);
    }
}

// Exporting the function, not its result
module.exports = prozisScraping;