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
// On import le model des category
const Category = require('./db/models/category.model')(sequelize, Sequelize);
// Tableau des categories
const categories = [
    {name: 'Whey', description: 'Apport de protéines pour votre alimentation.'},
    {name: 'Clear Whey', description: 'Apport de protéines pour votre alimentation.'},
    {name: 'Gainer', description: 'Le meilleur allié de vos prises de masse.'},
    {name: 'Creatine', description: 'Accrois tes performances et ton gain musculaire.'},
    {name: 'Pre-workout', description: 'Boosteur d\'énergie et d\'endurance pour vos séances les plus intenses.'},
    {name: 'Vitamines', description: 'Booster vos défenses et vos muscles avec de bonnes vitamines.'},
];

const createCategories = async () => {
    try {
        // On force la sync des categories
        await Category.sync({force: true});
        const newCategories = await Category.bulkCreate(categories);
        console.log('New Categories Created:', newCategories);
    } catch (error) {
        console.error('Error creating categories:', error);
    }
};

//createCategories();