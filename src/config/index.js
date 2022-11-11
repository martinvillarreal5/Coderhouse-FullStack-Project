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
  mongoDbUrl: `mongodb+srv://VillarrealDev:${
    node_env === "production"
      ? process.env.MONGODBPASSWORD
      : process.env.MONGODBPASSWORD_DEV
  }@cluster0.oc4hq9p.mongodb.net/?retryWrites=true&w=majority`,
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
