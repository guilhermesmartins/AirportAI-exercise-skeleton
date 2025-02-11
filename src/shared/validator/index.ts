import { transformAndValidate } from 'class-transformer-validator';
import { Request, Response, NextFunction } from 'express';

const isProd = false;

function makeValidateBody<T>(
  c: T,
  whitelist = true,
  errorHandler?: (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void,
) {
  return function ExpressClassValidate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const toValidate = req.body;
    if (!toValidate) {
      if (errorHandler) {
        errorHandler({ type: 'no-body' }, req, res, next);
      } else {
        res.status(400).json({
          error: true,
          message: 'Validation failed',
          ...(isProd
            ? {}
            : { originalError: { message: 'No request body found' } }),
        });
      }
    } else {
      transformAndValidate(c as any, toValidate, { validator: { whitelist } })
        .then((transformed: any) => {
          req.body = transformed;
          next();
        })
        .catch((err: any) => {
          if (errorHandler) {
            errorHandler(err, req, res, next);
          } else {
            res.status(400).json({
              error: true,
              message: 'Validation failed',
              ...(isProd ? {} : { originalError: err }),
            });
          }
        });
    }
  };
}

function makeValidateParams<T>(
  c: T,
  whitelist = true,
  errorHandler?: (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void,
) {
  return function ExpressClassValidate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const toValidate = req.params;
    if (!toValidate) {
      if (errorHandler) {
        errorHandler({ type: 'no-params' }, req, res, next);
      } else {
        res.status(400).json({
          error: true,
          message: 'Validation failed',
          ...(isProd
            ? {}
            : { originalError: { message: 'No request body found' } }),
        });
      }
    } else {
      transformAndValidate(c as any, toValidate, { validator: { whitelist } })
        .then((transformed: any) => {
          req.body = transformed;
          next();
        })
        .catch((err: any) => {
          if (errorHandler) {
            errorHandler(err, req, res, next);
          } else {
            res.status(400).json({
              error: true,
              message: 'Validation failed',
              ...(isProd ? {} : { originalError: err }),
            });
          }
        });
    }
  };
}

function makeValidateQueries<T>(
  c: T,
  whitelist = true,
  errorHandler?: (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void,
) {
  return function ExpressClassValidate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const toValidate = req.query;
    if (!toValidate) {
      if (errorHandler) {
        errorHandler({ type: 'no-queries' }, req, res, next);
      } else {
        res.status(400).json({
          error: true,
          message: 'Validation failed',
          ...(isProd
            ? {}
            : { originalError: { message: 'No request body found' } }),
        });
      }
    } else {
      transformAndValidate(c as any, toValidate, { validator: { whitelist } })
        .then((transformed: any) => {
          req.body = transformed;
          next();
        })
        .catch((err: any) => {
          if (errorHandler) {
            errorHandler(err, req, res, next);
          } else {
            res.status(400).json({
              error: true,
              message: 'Validation failed',
              ...(isProd ? {} : { originalError: err }),
            });
          }
        });
    }
  };
}

export { makeValidateBody, makeValidateParams, makeValidateQueries };
