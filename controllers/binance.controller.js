"use strict";

const responseFormatter = require("../utils/responseFormatter");

const test = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  binance.prices((error, result) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const latestPrice = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const symbol = req.query.symbol === "false" ? false : req.query.symbol;
  binance.prices(symbol, (error, result) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const currentBalances = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  binance.balance((error, result) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const bidAskPrices = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const symbol = req.query.symbol === "false" ? false : req.query.symbol;
  binance.bookTickers(symbol, (error, result) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const marketDepth = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const { symbol } = req.query;
  binance.depth(symbol, (error, result) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const limitOrderBuy = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const { symbol, quantity, price } = req.body;
  binance.buy(symbol, quantity, price, { type: "LIMIT" }, (error, result) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const limitBuy = req => {
  return new Promise((resolve, reject) => {
    const binance = require("../exchanges/binance")(req);
    const { pair, quantity, price } = req.body;
    const symbol = `${req.body.symbol}${req.body.pair}`;
    binance.buy(symbol, quantity, price, { type: "LIMIT" }, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const limitSell = req => {
  return new Promise((resolve, reject) => {
    const binance = require("../exchanges/binance")(req);
    const { pair, quantity, price } = req.body;
    const symbol = `${req.body.symbol}${req.body.pair}`;
    binance.sell(
      symbol,
      quantity,
      price,
      { type: "LIMIT" },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

const limitOrderSell = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const { symbol, quantity, price } = req.body;
  binance.sell(symbol, quantity, price, { type: "LIMIT" }, (error, result) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const marketOrderBuy = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const { symbol, quantity } = req.body;
  const flags = { type: "MARKET", newOrderRespType: "FULL" };
  binance.marketBuy(symbol, quantity, flags, (error, result) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const marketOrderSell = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const { symbol, quantity } = req.body;
  const flags = { type: "MARKET", newOrderRespType: "FULL" };
  binance.marketSell(symbol, quantity, flags, (error, result) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const stopLimitOrderBuy = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const { symbol, quantity, price, stopPrice, stopOrderType } = req.body;
  binance.buy(
    symbol,
    quantity,
    price,
    { stopPrice: stopPrice, type: stopOrderType || "STOP_LOSS_LIMIT" },
    (error, result) => {
      if (error) {
        return responseFormatter.formatBinanceError(res, error);
      }
      return responseFormatter.formatResponse(res, result);
    }
  );
};

const stopLimitOrderSell = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const { symbol, quantity, price, stopPrice, stopOrderType } = req.body;
  binance.sell(
    symbol,
    quantity,
    price,
    { stopPrice: stopPrice, type: stopOrderType || "STOP_LOSS_LIMIT" },
    (error, result) => {
      if (error) {
        return responseFormatter.formatBinanceError(res, error);
      }
      return responseFormatter.formatResponse(res, result);
    }
  );
};

const slOrderBuy = req => {
  return new Promise((resolve, reject) => {
    const binance = require("../exchanges/binance")(req);
    const { quantity, price, stopPrice, stopOrderType } = req.body;
    const symbol = `${req.body.symbol}${req.body.pair}`;
    binance.buy(
      symbol,
      quantity,
      price,
      { stopPrice: stopPrice, type: stopOrderType || "STOP_LOSS_LIMIT" },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

const slOrderSell = req => {
  return new Promise((resolve, reject) => {
    const binance = require("../exchanges/binance")(req);
    const { quantity, price, stopPrice, stopOrderType } = req.body;
    const symbol = `${req.body.symbol}${req.body.pair}`;
    binance.sell(
      symbol,
      quantity,
      price,
      { stopPrice: stopPrice, type: stopOrderType || "STOP_LOSS_LIMIT" },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

const icebergOrderBuy = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const { symbol, quantity, price } = req.body;
  binance.buy(symbol, quantity, price, { icebergQty: 10 }, (error, result) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const icebergOrderSell = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const { symbol, quantity, price } = req.body;
  binance.sell(symbol, quantity, price, { icebergQty: 10 }, (error, result) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const cancelOrderById = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const { symbol, orderId } = req.body;
  binance.cancel(symbol, orderId, (error, result, symbol) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const cancelOrdersBySymbol = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const { symbol } = req.body;
  binance.cancelOrders(symbol, (error, result, symbol) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const openOrders = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const symbol = req.query.symbol === "false" ? false : req.query.symbol;
  binance.openOrders(symbol, (error, result, symbol) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const orderStatus = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const { orderId, symbol } = req.query;
  binance.orderStatus(symbol, orderId, (error, result, symbol) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const tradeHistory = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const { symbol } = req.query;
  binance.trades(symbol, (error, result, symbol) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const allOrders = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const { symbol } = req.query;
  binance.allOrders(symbol, (error, result, symbol) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const prevDataAll = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  binance.prevDay(false, (error, result, symbol) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

const prevData = (req, res, next) => {
  const binance = require("../exchanges/binance")(req);
  const { symbol } = req.query;
  binance.prevDay(symbol, (error, result, symbol) => {
    if (error) {
      return responseFormatter.formatBinanceError(res, error);
    }
    return responseFormatter.formatResponse(res, result);
  });
};

module.exports = {
  test,
  latestPrice,
  currentBalances,
  bidAskPrices,
  marketDepth,
  limitOrderBuy,
  limitOrderSell,
  marketOrderBuy,
  marketOrderSell,
  stopLimitOrderBuy,
  stopLimitOrderSell,
  slOrderBuy,
  slOrderSell,
  icebergOrderBuy,
  icebergOrderSell,
  cancelOrderById,
  cancelOrdersBySymbol,
  openOrders,
  orderStatus,
  tradeHistory,
  allOrders,
  prevDataAll,
  prevData,
  limitBuy,
  limitSell
};
