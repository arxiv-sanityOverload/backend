"use strict";

const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  User
} = require("./../models");

const register = (req, payload) => {
  return new Promise((resolve, reject) => {
    const unique_id = require("uuid/v4")();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(payload.password, salt);
    const newUser = payload;
    User.create(newUser)
      .then(result => {
        return resolve(result);
      })
      .catch(err => {
        return reject({ ...err,
          status: 409
        });
      });
  });
};

const login = (req, res) => {
  return new Promise((resolve, reject) => {
    User.findOne({
        where: {
          username: req.body.username
        }
      })
      .then(user => {
        if (!user) {
          return reject({
            message: "Incorrect username",
            status: 409
          });
        } else if (user) {
          // check if password matches
          const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            user.password
          ); // false
          if (!isPasswordCorrect) {
            return reject({
              message: "Incorrect password",
              status: 409
            });
          } else {
            const token = jwt.sign({
              id: user.id
            }, process.env.JWT_SECRET, {
              expiresIn: "365d"
            });
            const {
              id,
              username,
              email,
              fullName,
              phoneNumber,
              country,
              address,
              status,
              apiKey,
              secretKey
            } = user;
            const payload = {
              id,
              username,
              email,
              fullName,
              phoneNumber,
              country,
              address,
              token,
              status,
              apiKey,
              secretKey
            };
            return resolve(payload);
          }
        }
      })
      .catch(err => {
        return reject(err);
      });
  });
};

const user = (req, userId) => {
  return new Promise((resolve, reject) => {
    User.findById(userId)
      .then(user => {
        if (!user) {
          return reject({
            message: "Invalid userId",
            status: 409
          });
        } else if (user) {
          const {
            id,
            username,
            email,
            fullName,
            phoneNumber,
            country,
            address,
            status,
            apiKey,
            secretKey
          } = user;
          return resolve({
            id,
            username,
            email,
            fullName,
            phoneNumber,
            country,
            address,
            status,
            apiKey,
            secretKey
          });
        }
      })
      .catch(err => {
        return reject(err);
      });
  });
};

const settings = (req, userId, payload) => {
  return new Promise((resolve, reject) => {
    User.update(payload, {
        where: {
          id: userId
        }
      })
      .then(user => {
        return resolve({
          result: "Settings updated successfully",
          status: 200,
          error: null
        });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

module.exports = {
  login,
  register,
  user,
  settings
};
