const db = require("../db/models");
const config = require("../config/auth.config");
const User = db.user;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');

const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const creds = require('../mail/credentials.json');
// Lire le fichier HTML
const htmlContent = fs.readFileSync('./mail/template/verifMail.html', 'utf8');

let transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 465,
    secure: true,
    auth: {
        user: creds.auth.user,
        pass: creds.auth.pass
    },
});

exports.signup = (req, res) => {
    let verificationToken = uuidv4(); // Génère un token unique
    // Save User to Database
    User.create({
        name: req.body.name,
        firstName: req.body.firstName,
        email: req.body.email,
        emailToken: verificationToken,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            // Définir les paramètres
            const params = {
                name: user.name,
                verificationToken: verificationToken
            };
            // Compiler le template avec les paramètres
            const htmlContentParam = ejs.render(htmlContent, params);
            // options du mail
            let mailOptions = {
                from: 'noreply@myprottracker.com',
                to: user.email, // L'email de l'utilisateur
                subject: '[MYPROTTRACKER] Email verification',
                html: htmlContentParam,
            };
            // envoie du mail
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email envoyé: ' + info.response);
                }
            });
            res.send({ message: "Utilisateur enregistré !" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "Utilisateur introuvable." });
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Mot de passe incorrect !"
                });
            }

            const token = jwt.sign({ id: user.id },
                config.secret,
                {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: 7200, // 2 hours
                });

            res.status(200).send({
                id: user.id,
                name: user.name,
                firstName: user.firstName,
                email: user.email,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};