import { IsDateString, IsOptional, IsString } from 'class-validator';

class FindByKeywordsProductBO {
  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsDateString()
  lostTime?: Date;
}

export default FindByKeywordsProductBO;
