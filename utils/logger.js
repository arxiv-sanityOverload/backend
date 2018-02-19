'use strict';

const uuidv4 = require("uuid/v4");
const bunyan = require("bunyan");
const requestLogger = require("express-bunyan-logger");

const config = {
    name: "node-service",
    genReqId: (req) => {
        return req.headers["x-request-id"] || uuidv4();
    },
    obfuscate: ["req-headers.authorization"],
    parseUA: false
};

exports.logger = bunyan.createLogger({
    name: config.name
});

exports.requestLogger = requestLogger(config);