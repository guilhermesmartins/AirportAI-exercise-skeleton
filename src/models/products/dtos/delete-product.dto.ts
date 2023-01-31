import { IsMongoId } from 'class-validator';

class DeleteProductDTO {
  @IsMongoId()
  id: string;
}

export default DeleteProductDTO;
