require("dotenv").config();
const config = require("../config/db.config.js").development;

const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, DataTypes);
db.subscription = require("../models/subscription.model.js")(
  sequelize,
  DataTypes
);
db.user_product = require("../models/user_product.model.js")(
  sequelize,
  DataTypes
);
db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.category = require("../models/category.model.js")(sequelize, Sequelize);

db.user.hasOne(db.subscription, { foreignKey: "userId" });
db.subscription.belongsTo(db.user, { foreignKey: "userId" });
db.user.belongsToMany(db.product, { through: db.user_product });
db.product.belongsToMany(db.user, { through: db.user_product });

// Sync the database
db.sequelize.sync({ alter: true });

module.exports = db;
