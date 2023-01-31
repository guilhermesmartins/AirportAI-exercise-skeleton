import 'dotenv/config';

import express from 'express';
import { configure, getLogger } from 'log4js';
import LoggerMiddleware from './shared/logger/LoggerMiddleware';

const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

configure(`./src/config/log4js-${environment}.json`);

const logger = getLogger('server');

const main = async () => {
  const app = express();

  app.use(express.json());

  // logs every request
  const loggerMiddleware = new LoggerMiddleware();

  app.use(loggerMiddleware.execute);

  const port = process.env.API_PORT || 3000;

  app.listen(port, () => {
    logger.info(`Server running in http://localhost:${port}`);
  });
};

main();
