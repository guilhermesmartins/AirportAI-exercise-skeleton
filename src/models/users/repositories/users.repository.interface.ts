import CreateUserDTO from '../dtos/create-user.dto';
import { UserDocument } from '../entities/user';

export default interface UsersRepositoryInterface {
  create(createUserDTO: CreateUserDTO): Promise<UserDocument>;
  findByEmail(email: string): Promise<UserDocument | null>;
  findById(id: string): Promise<UserDocument | null>;
}
