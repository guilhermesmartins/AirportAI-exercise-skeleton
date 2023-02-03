import { container } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';

import LoginUserService from '../services/login-user.service';

class LoginUserController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const loginUserService = container.resolve(LoginUserService);

      const token = await loginUserService.execute({
        email,
        password,
      });

      res.status(200).send({ token });
    } catch (err) {
      next(err);
    }
  }
}

export default LoginUserController;
