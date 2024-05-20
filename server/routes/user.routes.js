const verifyToken = require("../middleware/user.middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/user/verification/:token', controller.verificationMail);

    app.get('/user', [verifyToken], controller.getUser);
};