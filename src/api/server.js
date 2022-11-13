import * as http from "http";
import { serverConfig } from "../config/index.js";
import logger from "../lib/logger.js";
import initializeExpressApp from "./app.js";
import startSocketIoServer from "./socket-io-server.js";

async function startWebServer() {
  //app
  const expressApp = initializeExpressApp();
  //server
  const APIAddress = await openConnection(expressApp);
  return APIAddress;
}

async function openConnection(expressApp) {
  const webServerPort = serverConfig.port || 0;
  logger.info(`Server is about to listen to port ${webServerPort}`);
  const server = http.createServer(expressApp);
  await startSocketIoServer(server); // ? Is the await needed?
  const connection = server.listen(webServerPort);

  return connection.address();
}

export { startWebServer };
