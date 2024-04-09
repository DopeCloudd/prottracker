const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Ingredient = sequelize.define("ingredients", {
        id_product: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_category: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        calories: {
            type: DataTypes.STRING,
            allowNull: true
        },
        proteins: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lipids: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fiber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        carbohydrates: {
            type: DataTypes.STRING,
            allowNull: true
        },
        L_citrulline: {
            type: DataTypes.STRING,
            allowNull: true
        },
        L_AAKG: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Beta_alanine: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Caffeine: {
            type: DataTypes.STRING,
            allowNull: true
        },
        L_theanine: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Taurine: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });

    return Ingredient;
}