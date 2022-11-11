import logger from "./lib/logger.js";
import { AppError, errorHandler } from "./lib/errorHandler.js";
import { startWebServer } from "./api/server.js";

async function start() {
  // Array of entry point is being used to support more entry-points
  // kinds like message queue, scheduled job, etc.
  // TODO check use cases
  logger.info(`The app is starting`);
  return Promise.all([startWebServer()]);
}

start()
  .then((startResponses) => {
    logger.info(startResponses, `The app has started successfully`);
  })
  .catch((error) => {
    errorHandler.handleError(
      new AppError("startup-failure", error.message, 500, false, error)
    );
  });
