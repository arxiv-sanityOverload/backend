process.env.NODE_ENV = process.env.NODE_ENV || "staging";

const express = require("express");
const appExpress = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const bugsnag = require("./utils/bugsnag");
// const swagger = require("swagger-express");

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

// const initSwagger = () => {
//   appExpress.use(
//     swagger.init(appExpress, {
//       apiVersion: "1.0",
//       swaggerVersion: "1.0",
//       swaggerURL: "/swagger",
//       swaggerJSON: "/api-docs.json",
//       swaggerUI: "./public/swagger/",
//       basePath: "http://localhost:3000",
//       info: {
//         title: "swagger-express",
//         description: "Swagger + Express = {swagger-express}"
//       },
//       apis: ["./api.yml"],
//       middleware: function(req, res) {}
//     })
//   );
// };

// const initDB = () => {
//   require("./db/sql");
// };

const initStaticPath = () => {
  appExpress.use(express.static(path.join(__dirname, "public")));
};

const initRoutes = () => {
  let routes = require("./routes/v1");
  // mount api v1 routes
  appExpress.use("/api/v1", routes);
};

const initLogger = () => {
  appExpress.use(require("./utils/logger").requestLogger);
};

const joiError = () => {
  appExpress.use((err, req, res, next) => {
    if (err.error && err.error.isJoi) {
      // we had a joi error, let's return a custom 400 json response
      const error = {
        result: null,
        status: 400,
        error: {
          message: err.error.details.map((item, index) => item.message),
          status: 400
        }
      };
      res.status(400).json(error);
    } else {
      // pass on to another error handler
      next(err);
    }
  });
};

const initErrorMiddleware = () => {
  appExpress.use((err, req, res, next) => {
    if (req.log) req.log.error(err);
    if (err.status >= 500) {
      bugsnag.notify(JSON.stringify(err));
    }
    if (process.env.NODE_ENV !== "development") {
      delete err.details;
      delete err.stack;
    }
    return res.status(+err.status || 500).json({
      result: null,
      status: err.status || 500,
      error: { message: err.message, status: err.status || 500 }
    });
  });
};

const initBugsnag = () => {
  appExpress.use(bugsnag.requestHandler);
};

const publishers = () => {
  require("./sockets/send");
};

const initHandlers = () => {
  initBugsnag();
  initViewEngine();
  initLogger();
  // initDB();
  initMiddleware();
  initStaticPath();
  // initSwagger();
  initRoutes();
  // publishers();
  // require("./bot/bot");
  joiError();
  initErrorMiddleware();
};

const init = () => {
  initHandlers();
};

module.exports = {
  appExpress,
  init
};
