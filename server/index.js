const express = require('express');
const cors = require('cors');
const app = express();
const port = 3032;
// Activer CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// On récupére la config db
const config = require("./db/config/db.config.js");
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
// On sync la base
const db = require("./db/models");
db.sequelize.sync();
// On import le model des product
const Product = require('./db/models/product.model')(sequelize, Sequelize);
// On import le model des categories
const Category = require('./db/models/category.model')(sequelize, Sequelize);
// On import le model des users
const User = require('./db/models/user.model')(sequelize, Sequelize);

app.get('/api/products/:idCategory', async (req, res) => {
    const {idCategory} = req.params;
    try {
        // Utilisation de Sequelize pour récupérer les produits de la catégorie spécifiée
        const products = await Product.findAll({
            where: {
                id_category: idCategory,
            },
        });
        res.json(products);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits', error);
        res.status(500).send('Erreur serveur');
    }
});

app.get('/api/product/:idProduct', async (req, res) => {
    const {idProduct} = req.params;
    try {
        // Utilisation de Sequelize pour récupérer les informations du produits suivant son id
        const product = await Product.findOne({
            where: {
                id: idProduct
            }
        });
        res.json(product);
    } catch (error) {
        console.error('Erreur lors de la récupération du produit', error);
        res.status(500).send('Erreur serveur');
    }
});

app.get('/api/categories', async (req, res) => {
    try {
        // Utilisation de Sequelize pour récupérer toutes les categories
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        console.error('Erreur lors de la récupération des categories', error);
        res.status(500).send('Erreur serveur');
    }
});
// Route de verification du token email
app.get('/verification/:token', async (req, res) => {
    const {token} = req.params;
    try {
        // Trouver l'utilisateur avec le token de vérification
        const user = await User.findOne({
            where: {
                emailToken: token
            }
        });
        // Si aucun token ne correspond
        if (!user) {
            return res.status(404).send('Token invalide ou déjà utilisé.');
        }
        // Marquer l'email comme vérifié et supprimer le token de vérification
        user.emailToken = null;
        user.emailVerification = true;
        // Enregistrez les modifications dans la base de données
        await user.save();
        // Rediriger l'utilisateur vers une page de succès ou envoyer une réponse JSON
        res.redirect('https://myprottracker.com/');
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'email:', error);
        res.status(500).send('Erreur serveur');
    }
});

// routes
require('./auth/routes/auth.routes')(app);
require('./auth/routes/user.routes')(app);

app.listen(port, () => {
    console.log(`Serveur écoutant sur le port ${port}`);
});
