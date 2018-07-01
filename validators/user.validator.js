const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .error(() => {
      return {
        message: "Invalid username"
      };
    })
    .required(),
  email: Joi.string()
    .email()
    .error(() => {
      return {
        message: "Invalid email"
      };
    })
    .required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/)
    .error(() => {
      return {
        message: "Invalid password"
      };
    })
    .required(),
  phoneNumber: Joi.string()
    .error(() => {
      return {
        message: "Invalid phone number"
      };
    })
    .required(),
  fullName: Joi.string()
    .error(() => {
      return {
        message: "Invalid full name"
      };
    })
    .required(),
  address: Joi.string()
    .error(() => {
      return {
        message: "Invalid address"
      };
    })
    .required(),
  apiKey: Joi.string()
    .error(() => {
      return {
        message: "Invalid apiKey"
      };
    })
    .required(),
  secretKey: Joi.string()
    .error(() => {
      return {
        message: "Invalid secretKey"
      };
    })
    .required(),
  country: Joi.string()
    .error(() => {
      return {
        message: "Invalid country"
      };
    })
    .required(),
  status: Joi.string(),
  tradeFactor: Joi.string(),
  tradeLimit: Joi.number()
});

const loginSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .error(() => {
      return {
        message: "Invalid username"
      };
    })
    .required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/)
    .error(() => {
      return {
        message: "Invalid password"
      };
    })
    .required()
});

const getUserSchema = Joi.object({
  userId: Joi.number()
    .error(() => {
      return {
        message: "Invalid userId"
      };
    })
    .required()
});

module.exports = {
  registerSchema,
  loginSchema,
  getUserSchema
};
