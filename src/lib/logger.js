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

/*
logger.fatal('fatal');
logger.error('error');
logger.warn('warn');
logger.info('info');
logger.debug('debug');
logger.trace('trace');
*/

export default logger;
