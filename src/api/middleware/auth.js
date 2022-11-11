import logger from "../../lib/logger.js";

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    logger.info(`User ${req.user.email} is authenticated`);
    return next();
  }
  logger.info(`User ${req.user.email} is NOT authenticated`);
  res.status(401).json("Not authenticated, user must be logged in");
};

const ensureAdminAuth = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    if (req.user.isAdmin) {
      logger.info(`User ${req.user.email} is authenticated and IS ADMIN`);
      return next();
    }
    logger.info(`User ${req.user.email} is authenticated but IS NOT ADMIN`);
    return res.status(403).json("Not authorized, user must be Admin");
  } else {
    logger.info(`User ${req.user.email} is NOT authenticated`);
    return res.status(401).json("Not authenticated, user must be logged in");
  }
};

export { ensureAuth, ensureAdminAuth };
