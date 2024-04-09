const db = require("../../db/models");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
    const {email} = req.body;
    // Email
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Pseudo déjà enregistré !"
            });
            return;
        }
        next();
    });
};

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail
};

module.exports = verifySignUp;