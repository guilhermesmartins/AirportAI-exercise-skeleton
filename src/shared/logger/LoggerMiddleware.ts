import { getLogger } from 'log4js';
import { Request, Response, NextFunction } from 'express';

const logger = getLogger('request-logger');

class LoggerMiddleware {
  public execute = (req: Request, res: Response, next: NextFunction): void => {
    logger.info(`${req.method} ${req.path}`);
    next();
  };
}

export default LoggerMiddleware;
