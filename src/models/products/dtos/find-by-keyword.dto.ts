import { IsDateString, IsOptional, IsString } from 'class-validator';

class FindByKeywordDTO {
  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsDateString()
  lostTime?: Date;
}

export default FindByKeywordDTO;
