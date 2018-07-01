"use strict";

const env = require("../config/env");

module.exports = req => {
  const binance = require("node-binance-api");
  // binance.options({
  //   APIKEY: process.env.BINANCE_API_KEY,
  //   APISECRET: process.env.BINANCE_SECRET_KEY,
  //   useServerTime: true,
  //   verbose: true,
  //   test: true
  // });
  binance.options({
    APIKEY: req.headers["x-api-key"],
    APISECRET: req.headers["x-secret-key"],
    useServerTime: true,
    verbose: true
    // test: true
  });
  return binance;
};
