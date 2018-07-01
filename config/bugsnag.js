const bugsnag = require("bugsnag");
bugsnag.register(require("./env").bugsnagKey);

app.use(bugsnag.requestHandler);

module.exports = bugsnag;
