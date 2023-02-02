import { inject, injectable } from 'tsyringe';
import { NotFound, BadRequest } from 'http-errors';

import FindByKeywordDTO from '../dtos/find-by-keyword.dto';
import { ProductsRepositoryInterface } from '../repositories/products-repository.interface';

@injectable()
class FindByKeywordService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepositoryInterface,
  ) {}

  async execute(findByKeywordDTO: FindByKeywordDTO) {
    if (!Object.keys(findByKeywordDTO).length) {
      throw new BadRequest('Query must have at least message or lostTime');
    }

    const products = await this.productsRepository.findByKeywords(
      findByKeywordDTO,
    );

    if (!products?.length) {
      throw new NotFound('No products found matching your criteria');
    }

    return products;
  }
}

export default FindByKeywordService;
