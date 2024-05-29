module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    emailToken: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    emailVerification: {
      type: Sequelize.DATE,
      defaultValue: false,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    stripeSessionId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    paidSubscription: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  return User;
};
