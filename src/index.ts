import 'dotenv/config';
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import { configure, getLogger } from 'log4js';

import './config/database';
import LoggerMiddleware from './shared/logger/LoggerMiddleware';
import './shared/container';
import ProductsRoutes from './models/products/routes/products.routes';
import UsersRoutes from './models/users/routes/users.routes';
import helmet from 'helmet';

const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

configure(`./src/config/log4js-${environment}.json`);

// health check
const healthCheckMiddleware = (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(200).json({ status: 'UP' });
};

const logger = getLogger('server');

const main = async () => {
  const app = express();

  app.use(helmet());
  app.use(express.json());

  // logs every request
  const loggerMiddleware = new LoggerMiddleware();

  app.use(loggerMiddleware.execute);

  // health check
  app.use('/health', healthCheckMiddleware);

  // routes
  const productsRoutes = new ProductsRoutes();
  app.use('/products', productsRoutes.execute());

  const usersRoutes = new UsersRoutes();
  app.use('/users', usersRoutes.execute());

  // handle errors
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    logger.info(err);
    logger.error(err);

    res.status(err.status || 500).json({
      message: err.message,
    });
  });

  const port = process.env.API_PORT || 3000;

  app.listen(port, () => {
    logger.info(`Server running in http://localhost:${port}`);
  });
};

main();
