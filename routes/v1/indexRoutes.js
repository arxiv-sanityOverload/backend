"use strict";

const express = require("express");
const router = express.Router();
const indexController = require("./../../controllers/index.controller");

const validator = require("express-joi-validation")({ passError: true });
const {
  registerSchema,
  loginSchema
} = require("./../../validators/user.validator");

router
  .route("/register")
  .post(validator.body(registerSchema), (req, res, next) => {
    indexController.register(req, res, next);
  });

router.route("/login").post(validator.body(loginSchema), (req, res, next) => {
  indexController.login(req, res, next);
});

router.route("/logout").get((req, res, next) => {
  req.logout();
  return responseFormatter.formatResponse(res, "Logout Successfull");
});

module.exports = router;
