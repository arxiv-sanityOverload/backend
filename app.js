require("dotenv").config();

process.env.NODE_ENV = process.env.NODE_ENV || "staging";

const express = require("express");
const appExpress = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
// const bugsnag = require("./utils/bugsnag");
const swagger = require("swagger-express");

const initViewEngine = () => {
  appExpress.set("views", path.join(__dirname, "views"));
  appExpress.set("view engine", "ejs");
};

const initMiddleware = () => {
  // parse body params and attach them to req.body
  appExpress.use(bodyParser.json());
  appExpress.use(bodyParser.urlencoded({ extended: true }));
  appExpress.use(cookieParser());
  appExpress.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Instance-Id"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
    next();
  });
};

const initSwagger = () => {
  appExpress.use(
    swagger.init(appExpress, {
      apiVersion: "1.0",
      swaggerVersion: "1.0",
      swaggerURL: "/swagger",
      swaggerJSON: "/api-docs.json",
      swaggerUI: "./public/swagger/",
      basePath: "http://localhost:3000",
      info: {
        title: "swagger-express",
        description: "Swagger + Express = {swagger-express}"
      },
      apis: ["./api.yml"],
      middleware: function(req, res) {}
    })
  );
};

const initDB = () => {
  require("./db/mongo");
};

const initStaticPath = () => {
  appExpress.use(express.static(path.join(__dirname, "public")));
};

const initPassport = () => {
  const passport = require("passport");
  const LocalStrategy = require("passport-local").Strategy;
  appExpress.use(
    require("express-session")({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    })
  );
  appExpress.use(passport.initialize());
  appExpress.use(passport.session());

  // Passport init
  const Account = require("./models/account");
  passport.use(new LocalStrategy(Account.authenticate()));
  passport.serializeUser(Account.serializeUser());
  passport.deserializeUser(Account.deserializeUser());
};

const initRoutes = () => {
  let routes = require("./routes/v1");
  // mount api v1 routes
  appExpress.use("/api/v1", routes);
};

const initSubscribers = () => {
  // let queueSubscribers = require('./queue');
  // queueSubscribers.init();
  // Instantly Start Ripple Block Subscriber
  // require('./ripple_subscribers');
};

const initLogger = () => {
  appExpress.use(require("./utils/logger").requestLogger);
};

const joiError = () => {
  appExpress.use((err, req, res, next) => {
    if (err.error && err.error.isJoi) {
      // we had a joi error, let's return a custom 400 json response
      res.status(400).json({
        result: null,
        status: 400,
        error: {
          type: err.type,
          message: JSON.parse(JSON.stringify(err.error))
        }
      });
    } else {
      // pass on to another error handler
      next(err);
    }
  });
};

const initErrorMiddleware = () => {
  // appExpress.use(bugsnag.errorHandler);
  appExpress.use((err, req, res, next) => {
    if (req.log) req.log.error(err);
    if (process.env.NODE_ENV !== "development") {
      delete err.details;
      delete err.stack;
    }
    return res.status(+err.status || 500).json({
      result: null,
      error: err,
      status: err.status
    });
  });
};

const initHandlers = () => {
  initViewEngine();
  initLogger();
  initDB();
  initMiddleware();
  initPassport();
  initStaticPath();
  initSwagger();
  initRoutes();
  joiError();
  initErrorMiddleware();
  initSubscribers();
};

const init = () => {
  initHandlers();
};

module.exports = {
  appExpress,
  init
};
