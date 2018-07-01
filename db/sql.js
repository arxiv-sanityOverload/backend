"use strict"

// TODO include this file at app start
// App could be main application or any consumer might need this

const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");

const logger = require("../utils/logger").logger;

let sequelize = new Sequelize(dbConfig.name, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: "mysql"
});

sequelize.authenticate()
    .then(() => {
        logger.info("[Sequelize] Connection Successfull");
    })
    .catch((err) => {
        logger.error("[Sequelize] [authenticate] Some Error Occurred");
        logger.error(err);
    });

module.exports = sequelize;