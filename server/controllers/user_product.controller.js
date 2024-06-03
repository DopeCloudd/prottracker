// Get db instance
const db = require("../db/models");

// Like a product
exports.likeProduct = async (req, res) => {
  // Get the user id and product id from the request
  const { userId, productId } = req.body;
  try {
    // Get user
    const user = await db.user.findByPk(userId);
    // Get product
    const product = await db.product.findByPk(productId);
    // Like the product for the user
    await user.addProduct(product, { through: { like: new Date() } });
    // Send a response
    res.status(200).send({ message: "Produit liké !" });
  } catch (error) {
    // Send an error response
    res.status(500).send({
      message: "Erreur lors du like du produit.",
      error: error.message,
    });
  }
};

// Unlike a product
exports.unlikeProduct = async (req, res) => {
  // Get the user id and product id from the request
  const { userId, productId } = req.body;
  try {
    // Get user
    const user = await db.user.findByPk(userId);
    // Get product
    const product = await db.product.findByPk(productId);
    // Unlike the product for the user by setting the like record to null
    await user.addProduct(product, { through: { like: null } });
    // Send a response
    res.status(200).send({ message: "Produit unliké !" });
  } catch (error) {
    // Send an error response
    res.status(500).send({ message: "Erreur lors de l'unlike du produit." });
  }
};

// Get all products liked by a user
exports.getLikedProducts = async (req, res) => {
  // Get the user id from the request
  const { userId } = req.params;
  try {
    // Get user
    const user = await db.user.findByPk(userId);
    // Get liked products
    const likedProducts = await user.getProducts({
      attributes: ["id"],
      through: {
        attributes: ["productId"],
        where: { like: { [db.Sequelize.Op.ne]: null } },
      },
    });
    // Map through the likedProducts to only return the productId
    const productIds = likedProducts.map(
      (product) => product.user_products.productId
    );
    // Send the liked products
    res.status(200).send(productIds);
  } catch (error) {
    // Send an error response
    res.status(500).send({
      message: "Erreur lors de la récupération des produits likés.",
      error: error.message,
    });
  }
};

// Alert on a product
exports.alertProduct = async (req, res) => {
  // Get the user id and product id from the request
  const { userId, productId } = req.body;
  try {
    // Get user
    const user = await db.user.findByPk(userId);
    // Get product
    const product = await db.product.findByPk(productId);
    // Alert the product for the user
    await user.addProduct(product, { through: { alert: new Date() } });
    // Send a response
    res.status(200).send({ message: "Vous serez notifié !" });
  } catch (error) {
    // Send an error response
    res
      .status(500)
      .send({ message: "Erreur lors de l'alerte sur le produit." });
  }
};

// Unalert a product
exports.unalertProduct = async (req, res) => {
  // Get the user id and product id from the request
  const { userId, productId } = req.body;
  try {
    // Get user
    const user = await db.user.findByPk(userId);
    // Get product
    const product = await db.product.findByPk(productId);
    // Unalert the product for the user by setting the alert record to null
    await user.addProduct(product, { through: { alert: null } });
    // Send a response
    res.status(200).send({ message: "Alerte retirée !" });
  } catch (error) {
    // Send an error response
    res.status(500).send({ message: "Erreur lors de l'unalert du produit." });
  }
};

// Get all products alerted by a user
exports.getAlertedProducts = async (req, res) => {
  // Get the user id from the request
  const { userId } = req.params;
  try {
    // Get user
    const user = await db.user.findByPk(userId);
    // Get alerted products
    const alertedProducts = await user.getProducts({
      attributes: ["id"],
      through: {
        attributes: ["productId"],
        where: { alert: { [db.Sequelize.Op.ne]: null } },
      },
    });
    // Map through the alertedProducts to only return the productId
    const productIds = alertedProducts.map(
      (product) => product.user_products.productId
    );
    // Send the alerted products
    res.status(200).send(productIds);
  } catch (error) {
    // Send an error response
    res.status(500).send({
      message: "Erreur lors de la récupération des produits alertés.",
      error: error.message,
    });
  }
};
