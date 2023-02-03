import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { NotFound, Unauthorized, InternalServerError } from 'http-errors';

import LoginUserDTO from '../dtos/login-user.dto';
import UsersRepositoryInterface from '../repositories/users.repository.interface';

@injectable()
class LoginUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
  ) {}

  async execute(loginUserDTO: LoginUserDTO) {
    const user = await this.usersRepository.findByEmail(loginUserDTO.email);

    if (!user) {
      throw new NotFound('user not found');
    }

    const isPasswordEqual = await bcrypt.compare(
      loginUserDTO.password,
      user.password,
    );

    if (!isPasswordEqual) {
      throw new Unauthorized('email or password not matching');
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new InternalServerError('JWT Secret not defined');
    }

    const token = sign({}, jwtSecret, {
      subject: user._id.toString(),
      expiresIn: '7d',
    });

    return token;
  }
}

export default LoginUserService;
