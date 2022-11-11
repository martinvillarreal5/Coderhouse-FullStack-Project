import * as http from "http";
import { serverConfig } from "../config/index.js";
import logger from "../lib/logger.js";
import initializeExpressApp from "./app.js";

async function startWebServer() {
  //app
  const expressApp = initializeExpressApp();
  //server
  const APIAddress = await openConnection(expressApp);
  return APIAddress;
}
async function openConnection(expressApp) {
  return new Promise((resolve) => {
    const portToListenTo = serverConfig.port;
    const webServerPort = portToListenTo || 0;
    logger.info(`Server is about to listen to port ${webServerPort}`);
    const server = http.createServer(expressApp);
    const connection = server.listen(webServerPort, () => {
      resolve(connection.address());
    });
  });
}

export { startWebServer };
