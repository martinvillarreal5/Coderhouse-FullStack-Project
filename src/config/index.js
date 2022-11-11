import "dotenv/config";

export const node_env = process.env.NODE_ENV;

export const loggerConfig = {
  logLevel: node_env === "production" ? "error" : "debug",
};

export const serverConfig = {
  port: node_env === "production" ? process.env.PORT : process.env.PORT_DEV,
  secret: process.env.SECRET,
};

export const databaseConfig = {
  mongoDbUrl:
    node_env === "production"
      ? process.env.MONGOATLAS_URL
      : process.env.MONGOATLAS_URL_DEV,
};

export const mailerConfig = {
  email:
    node_env === "production"
      ? process.env.MAILER_EMAIL
      : process.env.MAILER_EMAIL_DEV,
  password:
    node_env === "production"
      ? process.env.MAILER_PASS
      : process.env.MAILER_PASS_DEV,
};
