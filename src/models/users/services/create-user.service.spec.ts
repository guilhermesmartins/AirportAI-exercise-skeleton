import UsersRepositoryInterface from '../repositories/users.repository.interface';
import UsersRepositoryMock from '../repositories/users.repository.mock';
import { UserRole } from '../types';
import CreateUserService from './create-user.service';

let createUserService: CreateUserService;
let usersRepository: UsersRepositoryInterface;

describe('Create User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryMock();
    createUserService = new CreateUserService(usersRepository);
  });

  it('should be able to create a user', async () => {
    const user = await createUserService.execute({
      email: 'johndoe@gmail.com',
      name: 'John DOe',
      password: 'password123',
      role: UserRole.PASSENGER,
    });

    expect(user).toHaveProperty('_id');
  });
});
