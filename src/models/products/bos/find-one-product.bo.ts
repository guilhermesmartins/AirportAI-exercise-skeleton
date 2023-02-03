import { IsMongoId } from 'class-validator';

class FindOneProductBO {
  @IsMongoId()
  id: string;
}

export default FindOneProductBO;
