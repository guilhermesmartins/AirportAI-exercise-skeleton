import { injectable, inject } from 'tsyringe';
import { NotFound } from 'http-errors';

import FindOneProductDTO from '../dtos/find-one-product.dto';
import { ProductsRepositoryInterface } from '../repositories/products-repository.interface';

@injectable()
class FindOneProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepositoryInterface,
  ) {}

  async execute(findOneProductDTO: FindOneProductDTO) {
    const product = await this.productsRepository.findOne(findOneProductDTO);

    if (!product) {
      throw new NotFound('Product not found');
    }

    return product;
  }
}

export default FindOneProductService;
