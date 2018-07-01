"use strict";

const jwt = require("jsonwebtoken");

// validate the token supplied in request header
const validate = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(400).json({
      result: null,
      status: 400,
      error: {
        message: "Bad Request",
        status: 400
      }
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          result: null,
          status: 403,
          error: {
            message: "Invalid Request",
            status: 403
          }
        });
      } else {
        next();
      }
    });
  }
};

const getId = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(400).json({
      result: null,
      status: 400,
      error: {
        message: "Bad Request",
        status: 400
      }
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          result: null,
          status: 403,
          error: {
            message: "Invalid Request",
            status: 403
          }
        });
      } else {
        req.query.userId = decoded.id;
        next();
      }
    });
  }
};

module.exports = {
  validate,
  getId
};
