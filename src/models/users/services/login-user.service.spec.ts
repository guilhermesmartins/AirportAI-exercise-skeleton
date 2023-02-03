import 'dotenv/config';

import { NotFound, Unauthorized } from 'http-errors';

import UsersRepositoryInterface from '../repositories/users.repository.interface';
import UsersRepositoryMock from '../repositories/users.repository.mock';
import { UserRole } from '../types';
import CreateUserService from './create-user.service';
import LoginUserService from './login-user.service';

let usersRepository: UsersRepositoryInterface;
let createUserService: CreateUserService;
let loginUserService: LoginUserService;

describe('Login User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryMock();
    createUserService = new CreateUserService(usersRepository);
    loginUserService = new LoginUserService(usersRepository);
  });

  it('should not be able to log in a non existing user', async () => {
    expect(async () => {
      await loginUserService.execute({
        email: 'johndoe@gmail.com',
        password: '1233456',
      });
    }).rejects.toBeInstanceOf(NotFound);
  });

  describe('Existing User', () => {
    it('should not be able to log in with a different password', async () => {
      expect(async () => {
        const userEmail = 'johndoe@gmail.com';

        await createUserService.execute({
          email: userEmail,
          name: 'John Doe',
          password: '123456',
          role: UserRole.AGENT,
        });

        await loginUserService.execute({
          email: userEmail,
          password: 'rgsrioko',
        });
      }).rejects.toBeInstanceOf(Unauthorized);
    });

    it('should be able to log in and create a jwt', async () => {
      const userEmail = 'johndoe@gmail.com';
      const userPassword = '123456';

      await createUserService.execute({
        email: userEmail,
        name: 'John Doe',
        password: userPassword,
        role: UserRole.AGENT,
      });

      const token = await loginUserService.execute({
        email: userEmail,
        password: userPassword,
      });

      expect(token).toBeTruthy();
    });
  });
});
