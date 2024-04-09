const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const eafit_pages = require('./eafit_pages');

puppeteer.use(StealthPlugin());

async function eafitProductComposition() {

    const buttonCookies = '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll';

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
                const button = await page.$('#tab-label-additional');
                await button.click();
                await page.waitForSelector("#resp-table", {visible: true});
            } catch (e) {
                console.log(e);
            }

            // Extract data
            const data = await page.evaluate(() => {
                const extract = (selector) => {
                    const element = document.querySelector("#resp-table " + selector);
                    return element ? element.innerText.trim() : null;
                };

                return {
                    calories: extract("div.resp-table-row:nth-child(2) div.table-body-cell:nth-child(2)"),
                    lipids: extract("div.resp-table-row:nth-child(3) div.table-body-cell:nth-child(2)"),
                    carbohydrates: extract("div.resp-table-row:nth-child(5) div.table-body-cell:nth-child(2)"),
                    fiber: extract("div.resp-table-row:nth-child(7) div.table-body-cell:nth-child(2)"),
                    proteins: extract("div.resp-table-row:nth-child(8) div.table-body-cell:nth-child(2)"),
                    salt: extract("div.resp-table-row:nth-child(9) div.table-body-cell:nth-child(2)")
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
                const button = await page.$('#tab-label-additional');
                await button.click();
                await page.waitForSelector("#resp-table", {visible: true});
            } catch (e) {
                console.log(e);
            }

            // Extract data
            const data = await page.evaluate(() => {
                const extract = (selector) => {
                    const element = document.querySelector("#resp-table " + selector);
                    return element ? element.innerText.trim() : null;
                };

                return {
                    L_citrulline: extract("div.resp-table-row:nth-child(8) div.table-body-cell:nth-child(2)"),
                    L_AAKG: extract("div.resp-table-row:nth-child(3) div.table-body-cell:nth-child(2)"),
                    Beta_alanine: extract("div.resp-table-row:nth-child(7) div.table-body-cell:nth-child(2)"),
                    Caffeine: extract("div.resp-table-row:nth-child(15) div.table-body-cell:nth-child(2)"),
                    Taurine: extract("div.resp-table-row:nth-child(9) div.table-body-cell:nth-child(2)")
                };
            });

            await page.close();
            // Combine the scraped data with the additionalData
            return {...data, url: url};
        };

        const proteinPages = {
            Whey: eafit_pages.Whey,
            Pure_Whey_Isolate: eafit_pages.Pure_Whey_Isolate,
            Micellaire: eafit_pages.Micellaire,
            Gainer_Prise_De_Masse: eafit_pages.Gainer_Prise_De_Masse
        };

        const preworkoutPages = {
            Pre_Workout: eafit_pages.Pre_Workout
        };

        // Créer un tableau pour toutes les promesses de scraping
        let allScrapingPromises = [];

        // Ajouter les promesses pour les pages de protéines
        Object.values(proteinPages).forEach(url => {
            allScrapingPromises.push(scrapePageWhey(url));
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
module.exports = eafitProductComposition;