const db = require("../db/models");
const config = require("../config/auth.config");
const User = db.user;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const mailService = require("../services/mail.service");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST);

exports.register = async (req, res) => {
  // Get body param from request
  const { name, firstName, email, password } = req.body;
  // Use Sequelize transaction to rollback if error
  const transaction = await db.sequelize.transaction();
  // Generate unique token to validate later user mail adress
  let verificationToken = uuidv4();
  try {
    // Verify that is no user already register with this mail
    const checkUsageEmail = await User.findOne({ where: { email: email } });
    // If email match to other user return error
    if (checkUsageEmail) {
      return res.status(400).send({ message: "Email is already in use." });
    }
    // Hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create Stripe customer
    const stripeCustomer = await stripe.customers.create({
      email: email,
    });
    // Create the new user
    const user = await User.create(
      {
        name: name,
        firstName: firstName,
        email: email,
        emailToken: verificationToken,
        password: hashedPassword,
        stripeCustomerId: stripeCustomer.id,
      },
      { transaction }
    );
    // After user create, we send mail to verify his mail adress
    // Sending email
    const emailResponse = await mailService.sendVerificationEmail(
      user,
      verificationToken
    );
    // If error during mail send
    if (!emailResponse.success) {
      return res.status(500).send({ message: emailResponse.message });
    }
    // Commit the transaction
    await transaction.commit();
    // Return after user create et mail send
    res
      .status(200)
      .send({ message: "User created successfully. Email verification sent!" });
  } catch (error) {
    // Rollback the transaction if error
    await transaction.rollback();
    // Return error message
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  // Get body params
  const { email, password } = req.body;
  try {
    // Get user by provided mail
    let user = await User.findOne({ where: { email: email } });
    // If mail doesn't match an account
    if (!user) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }
    // Compare provided pass with the hash stored
    const isMatch = await bcrypt.compare(password, user.password);
    // If pass provided doesn't match
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }
    // Create JWT and sent it back
    jwt.sign(
      { id: user.id },
      config.secret,
      { expiresIn: 86400 },
      (err, token) => {
        if (err) throw err;
        res.status(200).send({
          id: user.id,
          firstName: user.firstName,
          name: user.name,
          email: user.email,
          accessToken: token,
        });
      }
    );
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
