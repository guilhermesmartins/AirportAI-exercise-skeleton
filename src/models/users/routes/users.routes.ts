import { Router } from 'express';
import { makeValidateBody } from '../../../shared/validator';
import CreateUserController from '../controllers/create-user.controller';
import LoginUserController from '../controllers/login-user.controller';
import CreateUserDTO from '../dtos/create-user.dto';
import LoginUserDTO from '../dtos/login-user.dto';

class UsersRoutes {
  execute() {
    const router = Router();

    const createUserController = new CreateUserController();

    router.post(
      '/',
      makeValidateBody(CreateUserDTO),
      createUserController.execute,
    );

    const loginUserController = new LoginUserController();

    router.post(
      '/login',
      makeValidateBody(LoginUserDTO),
      loginUserController.execute,
    );

    return router;
  }
}

export default UsersRoutes;
