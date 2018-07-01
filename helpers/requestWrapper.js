"use strict";
const request = require("request-promise");
const requestErrors = require("request-promise/errors");

const makeRequest = (payload, uri, queryParams, headers, method) => {
  return new Promise((resolve, reject) => {
    let options = {
      method: method,
      uri: uri,
      json: true,
      resolveWithFullResponse: true
    };
    if (headers !== {}) {
      options["headers"] = headers;
    } else {
      options["headers"] = {
        "Content-Type": "application/json"
      };
    }
    if (queryParams !== {}) {
      options["qs"] = queryParams;
    }
    if (method === "POST" || method === "PUT") {
      options["body"] = payload;
    }
    if (payload && payload.type === "formData") {
      options["formData"] = payload.formData;
      delete options["body"];
    }
    request(options)
      .then(response => {
        return resolve(response);
      })
      .catch(requestErrors.StatusCodeError, reason => {
        if (reason.statusCode >= 500) {
          // app.config.bugsnag.notify(reason, {options, source: "requestWrapper#73"});
        }
        return reject(reason);
      })
      .catch(err => {
        // bugsnag.notify(err, {source: "requestWrapper#78"});
        return reject(err);
      });
  });
};
module.exports = {
  makeRequest
};
