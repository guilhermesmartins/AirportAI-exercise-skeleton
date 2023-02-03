import { getModelForClass } from '@typegoose/typegoose';
import CreateUserDTO from '../dtos/create-user.dto';
import { User, UserDocument } from '../entities/user';
import UsersRepositoryInterface from './users.repository.interface';

class UsersRepositoryMock implements UsersRepositoryInterface {
  private users: UserDocument[];

  constructor() {
    this.users = [];
  }

  async create(createUserDTO: CreateUserDTO): Promise<UserDocument> {
    const userModel = getModelForClass(User);

    const user = new userModel(createUserDTO);

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    const user = this.users.find(u => u.email === email);

    console.log(user, email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string): Promise<UserDocument | null> {
    const user = this.users.find(u => u._id.toString() === id);

    if (!user) {
      return null;
    }

    return user;
  }
}

export default UsersRepositoryMock;
