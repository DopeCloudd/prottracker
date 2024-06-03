const controller = require("../controllers/user_product.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Like a product
  app.post("/user/like", controller.likeProduct);
  // Unlike a product
  app.post("/user/unlike", controller.unlikeProduct);
  // Get all products liked by a user
  app.get("/user/liked/:userId", controller.getLikedProducts);
  // Alert on a product
  app.post("/user/alert", controller.alertProduct);
  // Unalert a product
  app.post("/user/unalert", controller.unalertProduct);
  // Get all products alerted by a user
  app.get("/user/alerted/:userId", controller.getAlertedProducts);
};
