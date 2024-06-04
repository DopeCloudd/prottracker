// On récupère notre instance db
const db = require("../db/models");

exports.getCategories = (req, res) => {
  // Get all categories
  db.category
    .findAll()
    .then((categories) => {
      // Send the categories to the client
      res.status(200).send(categories);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

exports.getCategoryById = (req, res) => {
  // Get the category id
  const { categoryId } = req.params;

  // Get the category by id
  db.category
    .findByPk(categoryId)
    .then((category) => {
      // Send the category to the client
      res.status(200).send(category);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};
