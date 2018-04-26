require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || "staging";

const express = require('express');
const appExpress = express();
const bodyParser = require('body-parser');
// const bugsnag = require("./utils/bugsnag");

const initMiddleware = () => {
    // parse body params and attach them to req.body
    appExpress.use(bodyParser.json());
    appExpress.use(bodyParser.urlencoded({ extended: true }));
    appExpress.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Instance-Id');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
        next();
    });
};

const initDB = () => {
    require("./db/sql");
};

const initRoutes = () => {
    let routes = require('./routes/v1/indexRoutes');
    // mount api v1 routes
    appExpress.use('/v1', routes);
};


const initSubscribers = () => {
    // let queueSubscribers = require('./queue');
    // queueSubscribers.init();

    // Instantly Start Ripple Block Subscriber
    // require('./ripple_subscribers');
};

const initLogger = () => {
    appExpress.use(require("./utils/logger").requestLogger);
};

const initErrorMiddleware = () => {
    // appExpress.use(bugsnag.errorHandler);
    appExpress.use((err, req, res, next) => {
        if (req.log) req.log.error(err);
        if (process.env.NODE_ENV !== "development") {
            delete err.details;
            delete err.stack;
        }
        return res.status(+(err.status) || 500).json({
            result: null,
            error: err,
            status: err.status
        });
    });
};

const initHandlers = () => {
    initLogger();
    initDB();
    initMiddleware();
    initRoutes();
    initErrorMiddleware();
    initSubscribers();
};

const init = () => {
    initHandlers();
};

module.exports = {
    appExpress,
    init
};
