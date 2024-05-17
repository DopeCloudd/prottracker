const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const bulk_pages = require('./bulk/bulk_pages');

puppeteer.use(StealthPlugin());

async function test() {

    const buttonCookies = '#amgdprcookie-accept-btn';

    try {
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        });
        const scrapePage = async (url, id_category) => {
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
            const data = await page.evaluate(() => {
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
                const extractImageUrl = (selector) => {
                    const element = document.querySelector(selector);
                    return element ? element.src.trim() : null;
                };

                return {
                    title: extractText('span[data-ui-id=\'page-title-wrapper\']'),
                    price: extractPrice('span[data-price-type=\'finalPrice\'] span.price'),
                    description: extractText('#description p'),
                    image: extractImageUrl('.swiper-slide-active .main-image')
                };
            });

            await page.close();
            // Combine the scraped data with the additionalData
            return {url: url, ...data};
        };

        // Concurrently scrape all pages
        const pagesData = await Promise.all(
            bulk_pages.map(page => {
                return scrapePage(page.url, page.id_category);
            })
        );

        await browser.close();
        console.log(pagesData);
        return pagesData;

    } catch (error) {
        console.error("Error during scraping:", error.message);
    }
}

test();