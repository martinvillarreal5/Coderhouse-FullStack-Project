import logger from "../../lib/logger.js";

import { AppError } from "../../lib/error-handler.js";

export const socketAuth = (socket, next) => {
  const req = socket.request;
  logger.info({
    reqUser: req.user,
    /* reqSession: req.session,
      reqIsAuth: req.isAuthenticated(), */
  });
  if (req.user) {
    // TODO test if i should also check req.isAuth or req.session
    next();
  } else {
    next(
      new AppError(
        "unauthenticated-user",
        "User is not authenticated",
        401,
        true
      )
    ); // ? this error should be recived on client as connect_error event
  }
};
