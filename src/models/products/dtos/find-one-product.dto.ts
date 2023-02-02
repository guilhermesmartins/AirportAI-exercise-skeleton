import { IsMongoId } from 'class-validator';

class FindOneProductDTO {
  @IsMongoId()
  id: string;
}

export default FindOneProductDTO;
