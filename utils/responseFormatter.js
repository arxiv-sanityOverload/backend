"use strict";

const formatResponse = (res, responseBody) => {
  return res.status(200).json({
    result: responseBody,
    status: 200,
    error: null
  });
};

const formatError = (res, error, status) => {
  if (Array.isArray(error)) {
    error = error[0];
  }

  if (error.message) {
    error = error.message;
  } else if (error.errors) {
    if (Array.isArray(error.errors)) {
      error.errors = error.errors[0];
    }
    error = error.errors.message;
  }

  return res.status(status).json({
    result: null,
    status: status,
    error: error
  });
};

const formatBinanceError = (res, error) => {
  const errorBody = JSON.parse(error.body);
  const errorResult = {
    result: null,
    status: error.statusCode,
    error: {
      message: errorBody.msg,
      status: error.statusCode,
      code: errorBody.code
    }
  };
  if (errorResult.status >= 500) {
    const bugsnag = require("./bugsnag");
    bugsnag.notify(JSON.stringify(errorResult));
  }
  return res.status(error.statusCode).json(errorResult);
};

module.exports = {
  formatResponse,
  formatError,
  formatBinanceError
};
