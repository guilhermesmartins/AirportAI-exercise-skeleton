import { IsDate, IsString } from 'class-validator';

class CreateProductDTO {
  @IsDate()
  lostTime: Date;

  @IsString()
  type: string;

  @IsString()
  color: string;

  @IsString()
  title: string;
}

export default CreateProductDTO;
