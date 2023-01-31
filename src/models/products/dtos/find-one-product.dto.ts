import { IsMongoId, IsOptional } from 'class-validator';

class FindOneProductDTO {
  @IsMongoId()
  id: string;
}

export default FindOneProductDTO;
