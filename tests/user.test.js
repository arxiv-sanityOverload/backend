const should = require("should");
const mongoose = require("mongoose");
const Account = require("../models/account.js");
const db;

describe("Account", function() {
  before(function(done) {
    db = mongoose.connect("mongodb://localhost/arbitrage");
    done();
  });

  after(function(done) {
    mongoose.connection.close();
    done();
  });

  beforeEach(function(done) {
    var account = new Account({
      username: "12345",
      password: "testy"
    });

    account.save(function(error) {
      if (error) console.log("error" + error.message);
      else console.log("no error");
      done();
    });
  });

  it("find a user by username", function(done) {
    Account.findOne({ username: "12345" }, function(err, account) {
      account.username.should.eql("12345");
      console.log("   username: ", account.username);
      done();
    });
  });

  afterEach(function(done) {
    Account.remove({}, function() {
      done();
    });
  });
});
