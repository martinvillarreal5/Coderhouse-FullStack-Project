import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import middleware from "./middleware/middlewares.js";
import handleRouteErrors from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import { serverConfig, databaseConfig, node_env } from "../config/index.js";
import initializePassport from "./utils/passport.js";
//import { fileURLToPath } from 'url';
//import path, { dirname } from 'path'

export default function initializeExpressApp() {
  const expressApp = express();
  expressApp.use(
    node_env === "production"
      ? cors()
      : cors({
          // Set this in espeficic routes that need it, or use a middleware?
          origin: ["http://localhost:5173"],
          credentials: true,
        })
  );
  // ? Do not enable CORS for all routes in a production application.
  // ? This can lead to security vulnerabilities

  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(express.json());

  expressApp.set("view engine", "ejs");
  expressApp.use("/public", express.static("public")); // TODO use dirname

  expressApp.use(cookieParser());
  /*
    const isLocal = env === 'development'
    if (!isLocal) {
        app.set('trust proxy', 1)
    }
    */
  expressApp.use(
    session({
      secret: serverConfig.secret,
      store: MongoStore.create({ mongoUrl: databaseConfig.mongoDbUrl }),
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
      rolling: true,
      resave: false,
      saveUninitialized: false,
    })
  );

  initializePassport(expressApp);

  //expressApp.use(middleware.requestLogger);
  expressApp.get("/", (req, res) => {
    res.send("Hello World!");
  });

  expressApp.use("/", routes);
  expressApp.use(handleRouteErrors);
  expressApp.use(middleware.unknownEndpoint);
  return expressApp;
}
