import { getModelForClass } from '@typegoose/typegoose';

import CreateUserDTO from '../dtos/create-user.dto';
import { User, UserDocument } from '../entities/user';
import UsersRepositoryInterface from './users.repository.interface';

class UsersRepository implements UsersRepositoryInterface {
  private repository;

  constructor() {
    this.repository = getModelForClass(User, {
      schemaOptions: {
        timestamps: true,
      },
    });
  }

  async create(createUserDTO: CreateUserDTO): Promise<UserDocument> {
    const user = await this.repository.create(createUserDTO);

    await user.save();

    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.repository.findOne({
      email,
    });

    return user;
  }

  async findById(id: string): Promise<UserDocument | null> {
    const user = await this.repository.findById(id);

    return user;
  }
}

export default UsersRepository;
