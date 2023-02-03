import { IsDateString, IsEmail, IsString } from 'class-validator';

class CreateProductBO {
  @IsDateString()
  lostTime: Date;

  @IsString({
    message: 'Type must be a string',
  })
  type: string;

  @IsString({
    message: 'Color must be a string',
  })
  color: string;

  @IsString({
    message: 'Title must be a string',
  })
  title: string;

  @IsString({
    message: 'Brand must be a string',
  })
  brand: string;

  @IsEmail()
  ownerEmail: string;
}

export default CreateProductBO;
