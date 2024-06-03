module.exports = (sequelize, DataTypes) => {
  const UserProduct = sequelize.define("user_products", {
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "products",
        key: "id",
      },
      primaryKey: true,
    },
    like: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    alert: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  });

  return UserProduct;
};
