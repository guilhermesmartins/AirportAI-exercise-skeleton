import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../types';

class CreateUserDTO {
  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export default CreateUserDTO;
