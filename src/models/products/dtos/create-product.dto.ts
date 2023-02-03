import { IsDateString, IsInstance, IsString } from 'class-validator';
import { Types } from 'mongoose';

class CreateProductDTO {
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

  @IsInstance(Types.ObjectId)
  userId: Types.ObjectId;
}

export default CreateProductDTO;
