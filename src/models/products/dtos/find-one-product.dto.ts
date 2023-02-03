import { IsMongoId } from 'class-validator';

class FindOneProductBO {
  @IsMongoId()
  id: string;

  @IsMongoId()
  userId: string;
}

export default FindOneProductBO;
