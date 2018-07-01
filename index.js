"use strict";
require("dotenv").config();
// let models = require("./models");

// models.sequelize.sync().then(() => {
let server = require("./server");
server.init();
// });
