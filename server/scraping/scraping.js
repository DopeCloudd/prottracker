const fs = require('fs');
// On récupére la config db
const config = require("../db/config/db.config.js");
// On init Sequelize
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);
// On import le model des product pour les insert après le scraping
const Product = require('../db/models/product.model')(sequelize, Sequelize);
// On import les fonctions de scraping
const bulkScraping = require('./bulk/bulk_scraper');
const myproteinScraping = require('./myprotein/myprotein_scraper');
const eafitScraping = require('./eafit/eafit_scraper');
const prozisScraping = require('./prozis/prozis_scraper');
const {cleanQuantity} = require('./utilities/clean');
const myproteinProductComposition = require('./myprotein/myprotein_products_composition');
const eafitProductComposition = require('./eafit/eafit_products_composition');

// Fonction qui drop les tables et créer les nouveaux produits scraper
async function create() {
    // On force la sync du modele Product (drop and create)
    await Product.sync({force: true});
    try {
        // On récupére et parse les données scraper de Bulk
        let bulkData = Object.values(await bulkScraping());
        // On insert les résultats de Bulk
        Object.keys(bulkData).forEach((key) => {
            Product.create({
                id_category: bulkData[key].id_category,
                title: bulkData[key].title,
                currentPrice: bulkData[key].price,
                lowestPrice: bulkData[key].price,
                highestPrice: bulkData[key].price,
                quantity: cleanQuantity(bulkData[key].quantity),
                url: bulkData[key].url,
                description: bulkData[key].description,
                image: fs.readFileSync(bulkData[key].image),
                brand: bulkData[key].brand,
            }).then(res => {
                fs.writeFileSync(bulkData[key].image, res.image);
            }).catch((error) => {
                console.error('Failed to create a new record : ', error);
            });
        });
    } catch (e) {
        console.error(e)
    }
    try {
        // On récupére et parse les données scraper de Myprotein
        let myproteinData = Object.values(await myproteinScraping());
        // On insert les résultats de Myprotein
        Object.keys(myproteinData).forEach((key) => {
            Product.create({
                id_category: myproteinData[key].id_category,
                title: myproteinData[key].title,
                currentPrice: myproteinData[key].price,
                lowestPrice: myproteinData[key].price,
                highestPrice: myproteinData[key].price,
                quantity: cleanQuantity(myproteinData[key].quantity),
                url: myproteinData[key].url,
                description: myproteinData[key].description,
                image: fs.readFileSync(myproteinData[key].image),
                brand: myproteinData[key].brand,
            }).then(res => {
                fs.writeFileSync(myproteinData[key].image, res.image);
            }).catch((error) => {
                console.error('Failed to create a new record : ', error);
            });
        });
    } catch (e) {
        console.error(e)
    }
    try {
        // On récupére et parse les données scraper de Prozis
        let prozisData = Object.values(await prozisScraping());
        // On insert les résultats de Myprotein
        Object.keys(prozisData).forEach((key) => {
            Product.create({
                id_category: prozisData[key].id_category,
                title: prozisData[key].title,
                currentPrice: prozisData[key].price,
                lowestPrice: prozisData[key].price,
                highestPrice: prozisData[key].price,
                quantity: cleanQuantity(prozisData[key].quantity),
                url: prozisData[key].url,
                description: prozisData[key].description,
                image: fs.readFileSync(prozisData[key].image),
                brand: prozisData[key].brand,
            }).then(res => {
                fs.writeFileSync(prozisData[key].image, res.image);
            }).catch((error) => {
                console.error('Failed to create a new record : ', error);
            });
        });
    } catch (e) {
        console.error(e)
    }
    try {
        // On récupére et parse les données scraper de Eafit
        let eafitData = Object.values(await eafitScraping());
        // On insert les résultats de Myprotein
        Object.keys(eafitData).forEach((key) => {
            Product.create({
                id_category: eafitData[key].id_category,
                title: eafitData[key].title,
                currentPrice: eafitData[key].price,
                lowestPrice: eafitData[key].price,
                highestPrice: eafitData[key].price,
                quantity: cleanQuantity(eafitData[key].quantity),
                url: eafitData[key].url,
                description: eafitData[key].description,
                image: fs.readFileSync(eafitData[key].image),
                brand: eafitData[key].brand,
            }).then(res => {
                fs.writeFileSync(eafitData[key].image, res.image);
            }).catch((error) => {
                console.error('Failed to create a new record : ', error);
            });
        });
    } catch (e) {
        console.error(e)
    }
}

// Fonction qui update les produits en base (currentPrice, lowestPrice, highestPrice)
async function update() {
    // On sync le modele Product
    Product.sync();
    // On récupére et parse les données scraper de Bulk
    let bulkData = Object.values(await bulkScraping());
    // On récupére et parse les données scraper de Myprotein
    let myproteinData = Object.values(await myproteinScraping());
    // On récupére et parse les données scraper de Eafit
    let eafitData = Object.values(await eafitScraping());
    // On récupére et parse les données scraper de Prozis
    let prozisData = Object.values(await prozisScraping());
    // Combinez les données de tous les sites
    const allData = [...bulkData, ...myproteinData, ...eafitData, ...prozisData];
    try {
        for (const productData of allData) {
            const {url, price} = productData;
            // Trouvez le produit dans la base de données en fonction de l'URL
            const product = await Product.findOne({
                where: {
                    url: url
                }
            });
            // Si le produit est trouvé, mettez à jour les prix le plus bas et le plus haut
            if (product) {
                // On test si le prix récupéré est plus petit que l'ancien lowestPrice
                if (price < product.lowestPrice || product.lowestPrice == null) {
                    product.lowestPrice = price;
                }
                // On test si le prix récupéré est plus grand que l'ancien highestPrice
                if (price > product.highestPrice || product.highestPrice == null) {
                    product.highestPrice = price;
                }
                // Mise à jour du prix actuel
                product.currentPrice = price;
                // Enregistrez les modifications dans la base de données
                await product.save();
            } else {
                console.log(`Produit non trouvé pour l'URL : ${url}`);
            }
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour des prix :', error);
    }
}

//create();
//update();
//bulkScraping();
//myproteinScraping();
//eafitScraping();
//prozisScraping();
//myproteinProductComposition();
eafitProductComposition();