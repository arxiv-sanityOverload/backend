const mongoose = require('mongoose');
const dbConfig = require("../config/db.config");

const logger = require("../utils/logger").logger;

const URI = `mongodb:${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`
// const URI = `mongodb://localhost/arbitrage`;

mongoose.connect(URI).then(() => {
    console.log("DB connection successfull");
}).catch(err => {
    console.log("DB connection failed");
});