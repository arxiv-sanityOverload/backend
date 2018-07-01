"use strict";

const loadReadStream = (stream) => {
    return new Promise((resolve, reject) => {
        let data = "";
        stream.on("close", () => reject(new Error("Stream Closed")));
        stream.on("error", (err) => reject(err));
        stream.on("data", (chunk) => (data += chunk.toString()));
        stream.on("end", () => resolve(data));
    });
};

module.exports = {
    loadReadStream
};