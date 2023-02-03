import { IsDateString, IsMongoId, IsOptional, IsString } from 'class-validator';

class FindByKeywordDTO {
  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsDateString()
  lostTime?: Date;

  @IsMongoId()
  userId: string;
}

export default FindByKeywordDTO;
