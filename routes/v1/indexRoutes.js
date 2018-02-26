"use strict";

const express = require("express");
const router = express.Router();

const passport = require("passport");
const Account = require("./../../models/account");
const responseFormatter = require("./../../utils/responseFormatter");

router.route("/register").post((req, res, next) => {
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
        return next(err);
      }
      passport.authenticate("local")(req, res, () => {
        const { username, email } = result;
        return responseFormatter.formatResponse(res, {
          username,
          email
        });
      });
    }
  );
});

router.route("/login").post((req, res, next) => {
  passport.authenticate("local")(req, res, () => {
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
    return responseFormatter.formatResponse(res, payload);
  });
});

router.route("/logout").get((req, res, next) => {
  req.logout();
  return responseFormatter.formatResponse(res, "Logout Successfull");
});

module.exports = router;
