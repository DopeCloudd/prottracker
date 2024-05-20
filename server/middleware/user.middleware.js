const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const verifyToken = (req, res, next) => {
    let authHeader = req.headers["x-access-token"];
    let token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).send({message: "No token provided!"});
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({message: "Unauthorized!", token: token, error: err});
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;