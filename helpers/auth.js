'use strict';

const jwt = require('jsonwebtoken');

// generate the JWT
const generateToken = (req) => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({
        auth: 'magic',
        agent: req.headers['user-agent'],
        exp:  Math.floor(new Date().getTime()/1000) + 7*24*60*60
    }, secret);
    return token;
};

// validate the token supplied in request header
const validate = (req, res) => {
    var token = req.headers.authorization;
    try {
      var decoded = jwt.verify(token, secret);
    } catch (e) {
      return authFail(res);
    }
    if(!decoded || decoded.auth !== 'magic') {
      return authFail(res);
    } else {
      return privado(res, token);
    }
}

module.exports = {
    generateToken,
    validate
}