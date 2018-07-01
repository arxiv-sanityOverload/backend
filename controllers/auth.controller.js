"use strict";

const authService = require("../services/auth.service");
const responseFormatter = require("../utils/responseFormatter");

const register = (req, res, next) => {
  const {
    username,
    email,
    fullName,
    password,
    phoneNumber,
    country,
    address,
    apiKey,
    secretKey
  } = req.body;
  const newUser = {
    username,
    email,
    fullName,
    password,
    phoneNumber,
    country,
    address,
    apiKey,
    secretKey
  };
  authService
    .register(req, newUser)
    .then(result => {
      const { username, email } = result;
      return responseFormatter.formatResponse(res, { username, email });
    })
    .catch(err => {
      next(err);
    });
};

const login = (req, res, next) => {
  authService
    .login(req, res)
    .then(result => {
      return responseFormatter.formatResponse(res, result);
    })
    .catch(err => {
      next(err);
    });
};

const user = (req, res, next) => {
  const { userId } = req.query;
  authService
    .user(req, userId)
    .then(result => {
      return responseFormatter.formatResponse(res, result);
    })
    .catch(err => {
      next(err);
    });
};

const settings = (req, res, next) => {
  const { userId } = req.query;
  const payload = req.body;
  authService
    .settings(req, userId, payload)
    .then(result => {
      return responseFormatter.formatResponse(res, result);
    })
    .catch(err => {
      next(err);
    });
};

module.exports = {
  login,
  register,
  user,
  settings
};
