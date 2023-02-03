import { injectable, inject } from 'tsyringe';
import DeleteProductDTO from '../dtos/delete-product.dto';
import { ProductsRepositoryInterface } from '../repositories/products-repository.interface';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepositoryInterface,
  ) {}

  async execute(deleteProductDTO: DeleteProductDTO): Promise<void> {
    await this.productsRepository.delete(deleteProductDTO);
  }
}

export default DeleteProductService;
