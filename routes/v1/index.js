"use strict";

const express = require("express");
const indexRoutes = require("./indexRoutes");
const router = express.Router();

/**
 * GET v1/status
 */
router.get("/ping", (req, res) => res.status(200).send("pong!"));

router.use("/", indexRoutes);

module.exports = router;
