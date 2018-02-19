"use strict"

const app = require('./app');
const appExpress = app.appExpress;
const env = require('./config/env');

const init = () => {
    app.init();
    appExpress.listen(env.nodePort, () => {
        console.log("Server is running on -->", env.nodePort);
    });
}

module.exports = {
    init
}