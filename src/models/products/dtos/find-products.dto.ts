import { IsDate, IsOptional, IsString } from 'class-validator';

class FindProductsDTO {
  @IsOptional()
  @IsString()
  message: string;

  @IsOptional()
  @IsDate()
  lostTime: Date;
}

export default FindProductsDTO;
