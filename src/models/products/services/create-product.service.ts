import { injectable, inject } from 'tsyringe';
import { InternalServerError } from 'http-errors';

import CreateProductDTO from '../dtos/create-product.dto';
import { ProductsRepositoryInterface } from '../repositories/products-repository.interface';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepositoryInterface,
  ) {}

  async execute(createProductDTO: CreateProductDTO) {
    const product = await this.productsRepository.create(createProductDTO);

    if (!product) {
      throw new InternalServerError('Server not able to create the product');
    }

    return product;
  }
}

export default CreateProductService;
