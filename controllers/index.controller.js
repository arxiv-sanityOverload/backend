"use strict"

const indexService = require('../services/index.service')
const responseFormatter = require('../utils/responseFormatter')

const getCategories = (req, res, next) => {
    return indexService.getCategories(req)
        .then(result => responseFormatter.formatResponse(res, result))
        .catch(error => responseFormatter.formatResponse(res, error))
}

const getSubCategories = (req, res, next) => {
    return indexService.getSubCategories(req)
        .then(result => responseFormatter.formatResponse(res, result))
        .catch(error => responseFormatter.formatResponse(res, error))
}

const getCategoryRecents = (req, res, next, limit, offset) => {
    return indexService.getCategoryRecents(req, limit, offset)
        .then(result => responseFormatter.formatResponse(res, result))
        .catch(error => responseFormatter.formatResponse(res, error))
}

const getSubCategoryRecents = (req, res, next, limit, offset) => {
    return indexService.getSubCategoryRecents(req, limit, offset)
        .then(result => responseFormatter.formatResponse(res, result))
        .catch(error => responseFormatter.formatResponse(res, error))
}


const getSortedCategoryRecents = (req, res, next, limit, offset) => {
    return indexService.getSortedCategoryRecents(req, limit, offset)
        .then(result => responseFormatter.formatResponse(res, result))
        .catch(error => responseFormatter.formatResponse(res, error))
}

const getSortedSubCategoryRecents = (req, res, next, limit, offset) => {
    return indexService.getSortedSubCategoryRecents(req, limit, offset)
        .then(result => responseFormatter.formatResponse(res, result))
        .catch(error => responseFormatter.formatResponse(res, error))
}

module.exports = {
    getCategories,
    getSubCategories,
    getCategoryRecents,
    getSubCategoryRecents,
    getSortedCategoryRecents,
    getSortedSubCategoryRecents
}