"use strict";

const bugsnag = require("bugsnag");

const packageInfo = require("../package");

bugsnag.register(process.env.BUGSNAG_KEY, {appVersion: packageInfo.version});

module.exports = bugsnag;