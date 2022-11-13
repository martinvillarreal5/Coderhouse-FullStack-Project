import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import middleware from "./middleware/misc-middleware.js";
import handleRouteErrors from "./middleware/error-middleware.js";
import sessionMiddleware from "./middleware/session-middleware.js";
import routes from "./routes/index.js";
import { node_env } from "../config/index.js";
import initializePassport from "./utils/passport.js";
//import { fileURLToPath } from 'url';
//import path, { dirname } from 'path'

export default function initializeExpressApp() {
  const expressApp = express();
  expressApp.use(
    cors({
      // Set this in espeficic routes that need it, or use a middleware?
      origin: node_env === "production" ? ["*"] : ["http://localhost:5173"],
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
  expressApp.use(sessionMiddleware);

  initializePassport(expressApp);

  expressApp.use(middleware.requestLogger);
  expressApp.get("/", (req, res) => {
    res.send("Hello World!");
  });

  expressApp.use("/", routes);
  expressApp.use(handleRouteErrors);
  expressApp.use(middleware.unknownEndpoint);
  return expressApp;
}
