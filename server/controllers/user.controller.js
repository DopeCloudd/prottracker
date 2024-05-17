// On récupère notre instance db
const db = require("../db/models");

exports.verificationMail = (req, res) => {
    // On récupère le token mail en param URL
    const {token} = req.params;
    // Get user by token mail
    db.user.findOne({
        where: {
            emailToken: token
        }
    })
        .then(user => {
            // Si aucun token ne correspond
            if (!user) {
                return res.status(404).send('Token invalide ou déjà utilisé.');
            }
            // Marquer l'email comme vérifié et supprimer le token de vérification
            user.emailToken = null;
            user.emailVerification = true;
            // Enregistrez les modifications dans la base de données
            user.save();
            // Rediriger l'utilisateur vers une page de succès
            // TODO Créer la page front pour afficher un message de succès puis redirect vers accueil
            res.redirect('https://myprottracker.com/');
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        })
};