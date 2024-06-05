const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    currentPrice: {
      type: DataTypes.FLOAT,
    },
    priceHistory: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    lowestPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    highestPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_category: {
      type: DataTypes.INTEGER,
    },
  });

  Product.associate = (models) => {
    Product.belongsToMany(models.User, {
      through: models.UserProducts,
      foreignKey: "productId",
      as: "Users",
    });
  };

  return Product;
};
