"use strict"

const express = require('express');
const indexRoutes = require('./indexRoutes');
const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.json({status: 'OK'}));

router.use('/index', indexRoutes);

module.exports = router;