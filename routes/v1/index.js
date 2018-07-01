"use strict";

const express = require("express");
const router = express.Router();
const {
  validate
} = require("../../helpers/auth");
/**
 * GET v1/status
 */
router.get("/ping", (req, res) => res.status(200).send("pong!"));
router.get("/", (req, res) => res.status(200).send("Welcome to arXivOverload!"));

// router.use("/", authRoutes);

module.exports = router;
