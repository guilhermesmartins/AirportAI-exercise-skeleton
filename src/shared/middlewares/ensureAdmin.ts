import { NextFunction, Request, Response } from 'express';
import { Unauthorized, NotFound } from 'http-errors';

import UsersRepository from '../../models/users/repositories/users.repository';
import { UserRole } from '../../models/users/types';
export async function ensureAdmin(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.user;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new NotFound('user not found');
    }

    if (user.role !== UserRole.AGENT) {
      throw new Unauthorized('Only admins (agents) can do this operation');
    }

    return next();
  } catch (err) {
    next(err);
  }
}
