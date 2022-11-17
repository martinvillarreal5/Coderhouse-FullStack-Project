import pino from "pino";
import "dotenv/config";

const logger = pino({
  level: process.env.NODE_ENV === "production" ? "error" : "debug",
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
});

export default logger;
