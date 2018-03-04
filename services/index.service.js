"use strict";

const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("./../models/model");

const register = (req, payload) => {
  return new Promise((resolve, reject) => {
    const unique_id = require("uuid/v4")();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(payload.password, salt);
    const { username, email, fullName, password } = payload;
    const newUser = {
      username,
      email,
      fullName,
      password: hashedPassword,
      salt
    };
    User.create(newUser)
      .then(result => {
        return resolve(result);
      })
      .catch(err => {
        return reject({ ...err, status: 409 });
      });
  });
};

const login = (req, res) => {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return reject(err);
      }
      if (!user) {
        return reject({
          message: "Authentication failed",
          status: 400
        });
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return reject(loginErr);
        }
        const jwt = require("jsonwebtoken");
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
          expiresIn: "365d"
        });
        const payload = {
          id: req.user.id,
          username: req.user.username,
          email: req.user.email,
          token
        };
        return resolve(payload);
      });
    })(req, res);
  });
};

module.exports = {
  login,
  register
};
