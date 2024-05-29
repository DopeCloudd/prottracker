const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST);

const db = require("../db/models");
const User = db.user;

// Get Stripe Public Key
exports.getPublicKey = (req, res) => {
  res.status(200).send({ publicKey: process.env.STRIPE_PUBLIC_KEY_TEST });
};

// Create Payment Intent
exports.createPaymentIntent = async (req, res) => {
  // Get amount from request body
  const { amount } = req.body;
  // Check if amount is provided
  if (!amount) {
    return res.status(400).send({ error: "Amount is required" });
  }
  // Create PaymentIntent
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      description: "MyProtTracker subscription",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    res
      .status(400)
      .json({ error: "An error occured, unable to create payment intent" });
  }
};

// Create a Checkout Session
exports.createCheckoutSession = async (req, res) => {
  // Get user ID from request
  const userId = req.userId;
  // Get user from database
  const user = await User.findByPk(userId);
  // Check if user exists
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }
  // Get domain URL from environment variables
  const domainURL = process.env.DOMAIN_DEV;
  // Get line_items from request body
  const { line_items, customer_email } = req.body;
  // Check if line_items is provided
  if (!line_items) {
    return res.status(400).send({ error: "line_items is required" });
  }
  // Create new Checkout Session for the order
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email,
      success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/canceled`,
    });

    // Save user's session ID to database
    user.stripeSessionId = session.id;
    await user.save();

    res.status(200).json({ sessionId: session.id });
  } catch (e) {
    res
      .status(400)
      .json({ error: "An error occured, unable to create session" });
  }
};

// Get Checkout Session
exports.getCheckoutSession = async (req, res) => {
  const { stripeSessionId } = req.params;
  if (!stripeSessionId) {
    return res.status(400).send({ error: "stripeSessionId is required" });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);
    res.status(200).json(session);
  } catch (e) {
    res.status(400).json({ error: "An error occured, unable to get session" });
  }
};
