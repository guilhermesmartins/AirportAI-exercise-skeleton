import { inject, injectable } from 'tsyringe';
import { NotFound, BadRequest } from 'http-errors';

import { ProductsRepositoryInterface } from '../repositories/products-repository.interface';
import UsersRepositoryInterface from 'src/models/users/repositories/users.repository.interface';
import FindByKeywordDTO from '../dtos/find-by-keyword.dto';
import { UserRole } from 'src/models/users/types';

@injectable()
class FindByKeywordService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepositoryInterface,
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
  ) {}

  async execute(findByKeywordDTO: FindByKeywordDTO) {
    if (!Object.keys(findByKeywordDTO).length) {
      throw new BadRequest('Query must have at least message or lostTime');
    }

    const user = await this.usersRepository.findById(findByKeywordDTO.userId);

    if (!user) {
      throw new NotFound('User not found');
    }

    if (user.role === UserRole.AGENT) {
      const products = await this.productsRepository.findByKeywords(
        findByKeywordDTO,
      );

      if (!products?.length) {
        throw new NotFound('No products found matching your criteria');
      }

      return products;
    }

    const products = await this.productsRepository.findByKeywordsAndUserId(
      findByKeywordDTO,
    );

    if (!products?.length) {
      throw new NotFound('No products found matching your criteria');
    }

    return products;
  }
}

export default FindByKeywordService;
