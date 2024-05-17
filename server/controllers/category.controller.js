// On récupère notre instance db
const db = require("../db/models");

exports.getCategories = (req, res) => {
    // Récupère tout les produits
    db.category.findAll()
        .then(categories =>{
            // On renvoie la liste des categories
            res.status(200).send(categories);
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        })
};