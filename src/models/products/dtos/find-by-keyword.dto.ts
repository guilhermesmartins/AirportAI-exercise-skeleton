import { IsDateString, IsOptional, IsString } from 'class-validator';

class FindByKeywordDTO {
  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  owner: string;

  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsDateString()
  lostTime: Date;
}

export default FindByKeywordDTO;
