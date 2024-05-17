// On récupère notre instance db
const db = require("../db/models");

exports.getProductById = (req, res) => {
    // On get l'id produit depuis l'URL
    const {idProduct} = req.params;
    // Récupère tout les produits
    db.product.findOne({
        where: {
            id: idProduct
        }
    })
        .then(product =>{
            // On renvoie le produit
            res.status(200).send(product);
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        })
};

exports.getProductByCategory = (req, res) => {
    // On get l'id category depuis l'URL
    const {idCategory} = req.params;
    // Récupère tout les produits
    db.product.findAll({
        where: {
            id_category: idCategory,
        },
    })
        .then(products =>{
            // On renvoie la liste des produits
            res.status(200).send(products);
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        })
};