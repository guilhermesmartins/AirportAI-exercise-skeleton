import bcrypt from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { InternalServerError } from 'http-errors';

import CreateUserDTO from '../dtos/create-user.dto';
import UsersRepositoryInterface from '../repositories/users.repository.interface';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
  ) {}

  async execute(createUserDTO: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);

    const createUserWithHashedPassword = {
      ...createUserDTO,
      password: hashedPassword,
    } as CreateUserDTO;

    const user = await this.usersRepository.create(
      createUserWithHashedPassword,
    );

    if (!user) {
      throw new InternalServerError('Not able to create user');
    }

    return user;
  }
}

export default CreateUserService;
