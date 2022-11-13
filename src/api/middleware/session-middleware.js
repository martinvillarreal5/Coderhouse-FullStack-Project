import { serverConfig, databaseConfig } from "../../config/index.js";
import session from "express-session";
import MongoStore from "connect-mongo";

const sessionMiddleware = session({
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
});

export default sessionMiddleware;
