"use strict";

const binanceController = require("../controllers/binance.controller");
const responseFormatter = require("../utils/responseFormatter");
const binance = require("../exchanges/binance");
const { Order } = require("./../models");

const getStatus = status => {
  switch (status) {
    case "NEW":
    case "PARTIALLY_FILLED":
      return "PENDING";
    case "FILLED":
      return "FULFILLED";
    case "CANCELED":
    case "PENDING_CANCEL":
    case "REJECTED":
      return "REJECTED";
    case "EXPIRED":
      return "EXPIRED";
    default:
      return "NEW";
  }
};

const priceTrade = (req, res, next) => {
  const { type } = req.body;
  if (type === "buy") {
    binanceController
      .limitBuy(req)
      .then(result => {
        // update db
        const orderPayload = {
          orderId: result.orderId,
          userId: req.query.userId,
          orderType: "PRICE",
          symbol: req.body.symbol,
          pair: req.body.pair,
          price: req.body.price,
          side: result.side,
          quantity: req.body.quantity,
          status: getStatus(result.status),
          meta: JSON.stringify(result)
        };
        Order.create(orderPayload)
          .then(sqlResult => {
            return responseFormatter.formatResponse(res, result);
          })
          .catch(sqlError => {
            console.log(sqlError);
          });
      })
      .catch(err => {
        return responseFormatter.formatBinanceError(res, err);
      });
  } else if (type === "sell") {
    binanceController
      .limitSell(req)
      .then(result => {
        // update db
        const orderPayload = {
          orderId: result.orderId,
          userId: req.query.userId,
          orderType: "PRICE",
          symbol: req.body.symbol,
          pair: req.body.pair,
          price: req.body.price,
          side: result.side,
          quantity: req.body.quantity,
          status: getStatus(result.status),
          meta: JSON.stringify(result)
        };
        Order.create(orderPayload)
          .then(sqlResult => {
            return responseFormatter.formatResponse(res, result);
          })
          .catch(sqlError => {
            console.log(sqlError);
          });
        return responseFormatter.formatResponse(res, result);
      })
      .catch(err => {
        return responseFormatter.formatBinanceError(res, err);
      });
  }
};

const percentageTrade = (req, res, next) => {
  const { percentage, quantity } = req.body;
  const symbol = `${req.body.symbol}${req.body.pair}`;
  const binance = require("../exchanges/binance")(req);
  binance.prices(symbol, (error1, result1) => {
    if (error1) {
      return responseFormatter.formatBinanceError(res, error1);
    }
    const flags = { type: "MARKET", newOrderRespType: "FULL" };
    binance.marketBuy(symbol, quantity, flags, (error2, result2) => {
      if (error2) {
        return responseFormatter.formatBinanceError(res, error2);
      }
      let Decimal = require("decimal.js");
      let currentPrice = new Decimal(result1[symbol] || 0);
      let stopPrice = currentPrice
        .plus(currentPrice.times(percentage - 1).dividedBy(100))
        .toString();
      let price = currentPrice
        .plus(currentPrice.times(percentage).dividedBy(100))
        .toFixed(8)
        .toString();
      return binance.sell(
        symbol,
        quantity,
        price,
        {
          type: "LIMIT"
        },
        (error3, result3) => {
          if (error3) {
            return responseFormatter.formatBinanceError(res, error3);
          }
          // update db
          const orderPayload = {
            orderId: result2.orderId,
            userId: req.query.userId,
            orderType: "PERCENTAGE",
            symbol: req.body.symbol,
            pair: req.body.pair,
            price: req.body.price,
            side: "BUY",
            quantity: req.body.quantity,
            status: getStatus(result3.status),
            meta: JSON.stringify([result1, result2, result3])
          };
          Order.create(orderPayload)
            .then(sqlResult => {
              return responseFormatter.formatResponse(res, result);
            })
            .catch(sqlError => {
              console.log(sqlError);
            });
          return responseFormatter.formatResponse(res, [
            result3,
            result2,
            result1
          ]);
        }
      );
    });
  });
};

const conditionalTrade = (req, res, next) => {
  const { type } = req.body;
  const symbol = `${req.body.symbol}${req.body.pair}`;
  if (type === "buy") {
    // change it to callback type
    binanceController
      .slOrderBuy(req)
      .then(result => {
        console.log(result);
        const orderPayload = {
          orderId: result.orderId,
          userId: req.query.userId,
          orderType: "CONDITIONAL",
          symbol: req.body.symbol,
          pair: req.body.pair,
          price: req.body.price,
          side: "BUY",
          quantity: req.body.quantity,
          status: getStatus(result.status),
          meta: JSON.stringify(result)
        };
        Order.create(orderPayload)
          .then(sqlResult => {
            return responseFormatter.formatResponse(res, result);
          })
          .catch(sqlError => {
            console.log(sqlError);
          });
      })
      .catch(err => {
        return responseFormatter.formatBinanceError(res, err);
      });
  } else {
    binanceController
      .slOrderSell(req)
      .then(result => {
        console.log(result);
        const orderPayload = {
          orderId: result.orderId,
          userId: req.query.userId,
          orderType: "CONDITIONAL",
          symbol: req.body.symbol,
          pair: req.body.pair,
          price: req.body.price,
          side: "SELL",
          quantity: req.body.quantity,
          status: getStatus(result.status),
          meta: JSON.stringify(result)
        };
        Order.create(orderPayload)
          .then(sqlResult => {
            return responseFormatter.formatResponse(res, result);
          })
          .catch(sqlError => {
            console.log(sqlError);
          });
      })
      .catch(err => {
        return responseFormatter.formatBinanceError(res, err);
      });
  }
};

module.exports = {
  priceTrade,
  percentageTrade,
  conditionalTrade
};
