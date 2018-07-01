"use strict";

const express = require("express");
const router = express.Router();
const auth = require("../../helpers/auth");
const authController = require("./../../controllers/auth.controller");

const validator = require("express-joi-validation")({
  passError: true
});
const {
  registerSchema,
  loginSchema,
  getUserSchema
} = require("./../../validators/user.validator");

// router
//   .route("/register")
//   .post(validator.body(registerSchema), (req, res, next) => {
//     authController.register(req, res, next);
//   });

router
  .route("/register")
  .post((req, res, next) => {
    authController.register(req, res, next);
  });

// router.route("/login").post(validator.body(loginSchema), (req, res, next) => {
//   authController.login(req, res, next);
// });

router.route("/login").post((req, res, next) => {
  authController.login(req, res, next);
});

router
  .route("/user")
  .get(auth.getId, validator.query(getUserSchema), (req, res, next) => {
    authController.user(req, res, next);
  });

router.route("/settings").post(auth.getId, (req, res, next) => {
  authController.settings(req, res, next);
});

module.exports = router;
