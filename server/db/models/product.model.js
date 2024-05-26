const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currentPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Product;
};
