'use strict';

const URI = require('../config/uri');


const getIndex = (req) => {
    let requestObject = URI.getIndex;
    const result = "Success"
    req.log.info({result}, "[index.service-getIndex] requestCommand : " + requestObject.endpoint);
    return Promise.resolve(result);
};

const getUsers = (req, id) => {
    // db operations
    x.findById(id, (err, response) => {
        if (err) {
            return Promise.reject(err);
        }
        return Promise.resolve(response);
    });
};

module.exports = {
    getIndex,
    getUsers
};