// Get db instance and focus on User
const db = require("../db/models");
const User = db.user;

exports.verificationMail = async (req, res) => {
    // Get mail verification token from params
    const {token} = req.params;
    try {
        // Get user by token mail
        const user = await User.findOne({where: {emailToken: token}});
        // If the mail verification token doesn't match anyone
        if (!user) {
            return res.status(404).send('Token invalide ou déjà utilisé.');
        }
        // Reset token and set the datetime of mail verification
        user.emailToken = null;
        user.emailVerification = true;
        // Save modification to the db
        user.save();
        // Redirect user to the mail verification success page
        // TODO Créer la page front pour afficher un message de succès puis redirect vers accueil
        res.redirect('https://myprottracker.com/');
    } catch (error) {
        // Send error
        res.status(500).send({message: error.message});
    }
};

exports.getUser = async (req, res) => {
    try {
        // Get user data without password
        const user = await User.findByPk(req.userId, {attributes: {exclude: ['password']}});
        // Sending data
        res.status(200).send({
            id: user.id,
            name: user.name,
            firstName: user.firstName,
            email: user.email
        });
    } catch (error) {
        // Send error
        res.status(500).send({message: error.message});
    }
};