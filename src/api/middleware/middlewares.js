import logger from "../../lib/logger.js";

const requestLogger = (req, res, next) => {
  logger.info({
    method: req.method,
    path: req.path,
    body: req.body,
  });
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

export default {
  requestLogger,
  unknownEndpoint,
};
