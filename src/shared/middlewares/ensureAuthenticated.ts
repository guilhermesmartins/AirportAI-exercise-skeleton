import { NextFunction, Request, Response } from 'express';
import { Unauthorized, InternalServerError } from 'http-errors';
import { verify } from 'jsonwebtoken';

export async function ensureAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Unauthorized('You need to login to do this operation');
    }

    const [, token] = authHeader.split(' ');

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new InternalServerError('Jwt Secret not defined');
    }

    const { sub: userId } = verify(token, jwtSecret);

    req.user = {
      id: userId as string,
    };

    return next();
  } catch (err) {
    next(err);
  }
}
