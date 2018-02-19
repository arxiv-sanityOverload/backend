"use strict"

const express = require('express');
const router = express.Router();
const indexController = require("./../../controllers/index.controller");

router
    .route('/auth')
    .get((req, res, next) => {
        res.json({status: 'ok', msg: "Suyal"});
    });

router
    .route('/isAuthenticated')
    .get((req, res, next) => {
        indexController.getIndex(req, res, next);
    })

module.exports = router;