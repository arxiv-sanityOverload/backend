"use strict";

const Account = require("./../models/account");
const passport = require("passport");

const register = (req, res) => {
  return new Promise((resolve, reject) => {
    const unique_id = require("uuid/v4")();
    Account.register(
      new Account({
        username: req.body.username,
        email: req.body.email,
        unique_id
      }),
      req.body.password,
      (err, result) => {
        if (err) {
          return reject({ ...err, status: 409 });
        }
        passport.authenticate("local")(req, res, () => {
          return resolve(result);
        });
      }
    );
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
        const token = jwt.sign(
          { unique_id: req.user.unique_id },
          process.env.JWT_SECRET,
          {
            expiresIn: "365d"
          }
        );
        const payload = {
          unique_id: req.user.unique_id,
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
