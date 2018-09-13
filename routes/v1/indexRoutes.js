
"use strict"
const express = require('express');
const router = express.Router();
const indexController = require('../../controllers/index.controller')
// router
//     .route('/nested')
//     .get((req, res, next) => {
//         res.json({status: 'ok', msg: "Suyal"});
//     });

router.get('/categories', (req, res, next) => {
    indexController.getCategories(req, res, next)
})

router.get('/:category/subcategories', (req, res, next) => {
    indexController.getSubCategories(req, res, next)
})

router.get('/:category/recents', (req, res, next) => {
    let limit = Number(req.query.limit);
    let offset = Number(req.query.offset);
    
    indexController.getCategoryRecents(req, res, next, limit, offset)
})

router.get('/:subcategory/subcategory/recents', (req, res, next) => {
    let limit = Number(req.query.limit);
    let offset = Number(req.query.offset);
    indexController.getSubCategoryRecents(req, res, next, limit, offset)
})
module.exports = router;