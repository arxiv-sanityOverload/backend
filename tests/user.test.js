const should = require("chai").should();
const expect = require("chai").expect;
const supertest = require("supertest");
const api = supertest("http://localhost:3030");
const user = {
  cUcP: {
    username: "tushar",
    password: "Mrdcode4$"
  },
  cUiP: {
    username: "tushar",
    password: "Mrdcode$"
  },
  cUiP2: {
    username: "tushar",
    password: "Mrdcode42$"
  },
  iUcP: {
    username: "tu",
    password: "Mrdcode4$"
  },
  iUcP2: {
    username: "tudsafdd",
    password: "Mrdcode4$"
  },
  iUiP: {
    username: "tu",
    password: "Mr$dasdf"
  },
  iUiP2: {
    username: "tusharr",
    password: "Mrdcode43#"
  }
};

describe("test ping!", () => {
  it("should return pong!.", done => {
    api
      .get("/api/v1/ping")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.equal("pong!");
        done();
      });
  });
});

describe("test user login", () => {
  it("SQL -> should return 200 response if username and password are both correct.", done => {
    api
      .post("/api/v1/login")
      .set("Accept", "application/json")
      .send(user.cUcP)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body.result).to.be.an("object");
        expect(res.body.result.id).to.be.a("number");
        expect(res.body.result.username).to.be.a("string");
        expect(res.body.result.username).to.have.lengthOf.within(3, 20);
        expect(res.body.result.email).to.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        expect(res.body.result.fullName).to.match(/^[a-z0-9 ]+$/i);
        expect(res.body.result.phoneNumber).to.match(/^[0-9]+$/i);
        expect(res.body.result.country).to.be.a("string");
        expect(res.body.result.address).to.be.a("string");
        expect(res.body.result.token).to.be.a("string");
        expect(res.body.result.status).to.be.a("string");
        expect(res.body.result.status).to.have.lengthOf("1");
        expect(res.body.result.status).to.match(/^[01]+$/i);
        done();
      });
  });
  it("SQL -> should return 409 response with error as {Incorrect username} if only username is incorrect.", done => {
    api
      .post("/api/v1/login")
      .set("Accept", "application/json")
      .send(user.iUcP2)
      .expect("Content-Type", /json/)
      .expect(409)
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.result).to.be.a("null");
        expect(res.body.error).to.be.an("object");
        expect(res.body.error).to.have.own.property("message");
        expect(res.body.error).to.have.own.property("status");
        expect(res.body.error.status).to.equal(409);
        expect(res.body.error.message).to.equal("Incorrect username");
        done();
      });
  });
  it("SQL -> should return 409 response with error as {Incorrect password} if only password is incorrect.", done => {
    api
      .post("/api/v1/login")
      .set("Accept", "application/json")
      .send(user.cUiP2)
      .expect("Content-Type", /json/)
      .expect(409)
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.result).to.be.a("null");
        expect(res.body.error).to.be.an("object");
        expect(res.body.error).to.have.own.property("message");
        expect(res.body.error).to.have.own.property("status");
        expect(res.body.error.status).to.equal(409);
        expect(res.body.error.message).to.equal("Incorrect password");
        done();
      });
  });
  it("SQL -> should return 409 response with error as {Incorrect username} if both username and password are valid but incorrect.", done => {
    api
      .post("/api/v1/login")
      .set("Accept", "application/json")
      .send(user.iUiP2)
      .expect("Content-Type", /json/)
      .expect(409)
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.result).to.be.a("null");
        expect(res.body.error).to.be.an("object");
        expect(res.body.error).to.have.own.property("message");
        expect(res.body.error).to.have.own.property("status");
        expect(res.body.error.status).to.equal(409);
        expect(res.body.error.message).to.equal("Incorrect username");
        done();
      });
  });
  it("JOI -> should return 400 response with error as {Invalid username} if only username is incorrect.", done => {
    api
      .post("/api/v1/login")
      .set("Accept", "application/json")
      .send(user.iUcP)
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.result).to.be.a("null");
        expect(res.body.error).to.be.an("object");
        expect(res.body.error).to.have.own.property("message");
        expect(res.body.error).to.have.own.property("status");
        expect(res.body.error.status).to.equal(400);
        expect(res.body.error.message).to.be.an("array");
        expect(res.body.error.message[0]).to.equal("Invalid username");
        done();
      });
  });
  it("JOI -> should return 400 response with error as {Invalid password} if only password is incorrect.", done => {
    api
      .post("/api/v1/login")
      .set("Accept", "application/json")
      .send(user.cUiP)
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.result).to.be.a("null");
        expect(res.body.error).to.be.an("object");
        expect(res.body.error).to.have.own.property("message");
        expect(res.body.error).to.have.own.property("status");
        expect(res.body.error.status).to.equal(400);
        expect(res.body.error.message).to.be.an("array");
        expect(res.body.error.message[0]).to.equal("Invalid password");
        done();
      });
  });
  it("JOI -> should return 400 response with error as {Invalid username, Invalid password} if both username and password are invalid.", done => {
    api
      .post("/api/v1/login")
      .set("Accept", "application/json")
      .send(user.iUiP)
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.result).to.be.a("null");
        expect(res.body.error).to.be.an("object");
        expect(res.body.error).to.have.own.property("message");
        expect(res.body.error).to.have.own.property("status");
        expect(res.body.error.status).to.equal(400);
        expect(res.body.error.message).to.be.an("array");
        expect(res.body.error.message[0]).to.match(/^(Invalid username)$/);
        expect(res.body.error.message[1]).to.match(/^(Invalid password)$/);
        done();
      });
  });
});

describe("test user register", function() {
  it("should return 200 response for  new user register.", function(done) {
    done();
  });
});

// binance routes
// trade routes
// user routes
// settings routes
