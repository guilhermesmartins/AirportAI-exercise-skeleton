import { container } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';

import CreateUserService from '../services/create-user.service';

class CreateUserController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, password, role } = req.body;

      const createUserService = container.resolve(CreateUserService);

      const user = await createUserService.execute({
        email,
        name,
        password,
        role,
      });

      res.status(201).send({ user });
    } catch (err) {
      next(err);
    }
  }
}

export default CreateUserController;
