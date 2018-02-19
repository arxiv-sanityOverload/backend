"use strict"

const express = require('express');
const router = express.Router();

router
    .route('/nested')
    .get((req, res, next) => {
        res.json({status: 'ok', msg: "Suyal"});
    });

module.exports = router;