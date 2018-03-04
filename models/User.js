const Sequelize = require("sequelize");

const attributes = {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isAlphanumeric: true,
      msg: "Only characters A-Z, a-z or 0-9 are allowed"
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        args: true,
        msg: "Email is not valid"
      }
    }
  },
  fullName: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true,
      msg: "Only characters A-Z, a-z or 0-9 are allowed"
    }
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  }
};

const options = {
  freezeTableName: true
};

module.exports = {
  attributes,
  options
};
