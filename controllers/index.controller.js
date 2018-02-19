"use strict";

const indexService = require('../services/index.service');
const responseFormatter = require('../utils/responseFormatter');

const getIndex = (req, res, next) => {
    indexService.getIndex(req)
    .then((result) => responseFormatter.formatResponse(res, result))
    .catch((err) => next(err));
};

const getUsers = (req, res, next) => {
    const { id } = req.query;
    indexService.getUsers(req, id)
    .then((result) => responseFormatter.formatResponse(res, result))
    .catch((err) => next(err));
};

module.exports = {
    getIndex,
    getUsers
};