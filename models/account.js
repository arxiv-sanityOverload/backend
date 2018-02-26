var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var Account = new Schema({
  username: String,
  email: String,
  password: String,
  unique_id: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model("Account", Account);
