import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { errorHandler } from './src/common/middleware/error.middleware';
import { CommonRoutesConfig } from './src/common/common.routes.config';
import { UsersRoutes } from './src/users/users.routes.config';
import { AuthRoutes } from './src/auth/auth.routes.config';
import { PurchasesRoutes } from './src/purchases/purchases.routes.config';
import debug from 'debug';
import config from './src/config/config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());
app.use(cors());
app.use(errorHandler);

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!config.debug) {
  loggerOptions.meta = false;
  if (typeof global.it === 'function') {
    loggerOptions.level = 'http';
  }
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new AuthRoutes(app));
routes.push(new UsersRoutes(app));
routes.push(new PurchasesRoutes(app));

const runningMessage = `Server running at ${config.host} + ${config.port}`;

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage)
});

export default server.listen(config.port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  console.log(runningMessage);
});