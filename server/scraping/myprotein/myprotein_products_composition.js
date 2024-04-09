const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const myprotein_pages = require('./myprotein_pages');

puppeteer.use(StealthPlugin());

async function myproteinProductComposition() {

    const buttonCookies = '#onetrust-accept-btn-handler';

    try {
        const browser = await puppeteer.launch({
            headless: true,
            userDataDir: './puppeteerProfile'
        });
        const scrapePageWhey = async (url) => {
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
                    const button = document.querySelector('#product-description-heading-lg-8');
                    return button ? button.getAttribute('aria-expanded') : null;
                });
                if (ariaExpandedValue === 'false') {
                    const button = await page.$('#product-description-heading-lg-8');
                    await button.click();
                }
                await page.waitForSelector("#product-description-content-lg-8 table", {visible: true});
            } catch (e) {
                console.log(e);
            }

            // Extract data
            const data = await page.evaluate(() => {
                const extract = (selector) => {
                    const element = document.querySelector("#product-description-content-lg-8 table tbody " + selector);
                    return element ? element.innerText.trim() : null;
                };

                return {
                    calories: extract("tr:nth-child(1) td:nth-child(2)"),
                    lipids: extract("tr:nth-child(2) td:nth-child(2)"),
                    carbohydrates: extract("tr:nth-child(4) td:nth-child(2)"),
                    proteins: extract("tr:nth-child(5) td:nth-child(2)"),
                    salt: extract("tr:nth-child(6) td:nth-child(2)")
                };
            });

            await page.close();
            // Combine the scraped data with the additionalData
            return {...data, url: url};
        };

        const scrapePageGainer = async (url) => {
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
                    const button = document.querySelector('#product-description-heading-lg-8');
                    return button ? button.getAttribute('aria-expanded') : null;
                });
                if (ariaExpandedValue === 'false') {
                    const button = await page.$('#product-description-heading-lg-8');
                    await button.click();
                }
                await page.waitForSelector("#product-description-content-lg-8 table", {visible: true});
            } catch (e) {
                console.log(e);
            }

            // Extract data
            const data = await page.evaluate(() => {
                const extract = (selector) => {
                    const element = document.querySelector("#product-description-content-lg-8 table tbody " + selector);
                    return element ? element.innerText.trim() : null;
                };

                return {
                    calories: extract("tr:nth-child(1) td:nth-child(2)"),
                    lipids: extract("tr:nth-child(2) td:nth-child(2)"),
                    carbohydrates: extract("tr:nth-child(4) td:nth-child(2)"),
                    fiber: extract("tr:nth-child(5) td:nth-child(2)"),
                    proteins: extract("tr:nth-child(6) td:nth-child(2)"),
                    salt: extract("tr:nth-child(7) td:nth-child(2)")
                };
            });

            await page.close();
            // Combine the scraped data with the additionalData
            return {...data, url: url};
        };

        const scrapePagePreWorkout = async (url) => {
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
                    const button = document.querySelector('#product-description-heading-lg-8');
                    return button ? button.getAttribute('aria-expanded') : null;
                });
                if (ariaExpandedValue === 'false') {
                    const button = await page.$('#product-description-heading-lg-8');
                    await button.click();
                }
                await page.waitForSelector("#product-description-content-lg-8 table", {visible: true});
            } catch (e) {
                console.log(e);
            }

            // Extract data
            const data = await page.evaluate(() => {
                const extract = (selector) => {
                    const element = document.querySelector("#product-description-content-lg-8 table tbody " + selector);
                    return element ? element.innerText.trim() : null;
                };

                return {
                    L_citrulline: extract("tr:nth-child(1) td:nth-child(2)"),
                    L_AAKG: extract("tr:nth-child(2) td:nth-child(2)"),
                    Beta_alanine: extract("tr:nth-child(3) td:nth-child(2)"),
                    Caffeine: extract("tr:nth-child(4) td:nth-child(2)"),
                    L_theanine: extract("tr:nth-child(5) td:nth-child(2)")
                };
            });

            await page.close();
            // Combine the scraped data with the additionalData
            return {...data, url: url};
        };

        const proteinPages = {
            Whey: myprotein_pages.Whey,
            Pure_Whey_Isolate: myprotein_pages.Pure_Whey_Isolate,
            Clear_Whey_Isolate: myprotein_pages.Clear_Whey_Isolate
        };

        const gainerPages = {
            Gainer_Prise_De_Masse: myprotein_pages.Gainer_Prise_De_Masse
        };

        const preworkoutPages = {
            Pre_Workout: myprotein_pages.Pre_Workout
        };

        // Créer un tableau pour toutes les promesses de scraping
        let allScrapingPromises = [];

        // Ajouter les promesses pour les pages de protéines
        Object.values(proteinPages).forEach(url => {
            allScrapingPromises.push(scrapePageWhey(url));
        });

        // Ajouter les promesses pour les pages de gainers
        Object.values(gainerPages).forEach(url => {
            allScrapingPromises.push(scrapePageGainer(url));
        });

        // Ajouter les promesses pour les pages de pré-entraînement
        Object.values(preworkoutPages).forEach(url => {
            allScrapingPromises.push(scrapePagePreWorkout(url));
        });

        // Lancer toutes les promesses simultanément
        const pagesData = await Promise.all(allScrapingPromises);

        await browser.close();
        console.log(pagesData);
        return pagesData;

    } catch (error) {
        console.error("Error during scraping:", error.message);
    }
}

// Exporting the function, not its result
module.exports = myproteinProductComposition;