"use strict";

module.exports = {
    host: process.env.MYSQL_DB_HOST,
    name: process.env.MYSQL_DB_NAME,
    username: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    port: +process.env.MYSQL_DB_PORT
};