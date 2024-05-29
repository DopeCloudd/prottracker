const controller = require("../controllers/stripe.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Get Stripe Public Key
  app.get("/stripe/public-key", controller.getPublicKey);

  // Create Payment Intent
  app.post("/stripe/create-payment-intent", controller.createPaymentIntent);

  // Create Checkout Session
  app.post("/stripe/create-checkout-session", controller.createCheckoutSession);

  app.get("/stripe/session/:id", controller.getCheckoutSession);
};
