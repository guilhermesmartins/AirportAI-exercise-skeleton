import { IsDateString, IsString } from 'class-validator';

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
    message: 'Owner must be a string',
  })
  owner: string;

  @IsString({
    message: 'Brand must be a string',
  })
  brand: string;
}

export default CreateProductDTO;
