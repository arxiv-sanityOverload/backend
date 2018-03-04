const UserMeta = require("./User"),
  connection = require("./../db/sql");

const User = connection.define("users", UserMeta.attributes, UserMeta.options);

// you can define relationships here

module.exports.User = User;
