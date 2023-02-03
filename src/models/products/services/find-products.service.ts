import { inject, injectable } from 'tsyringe';
import { NotFound } from 'http-errors';

import { ProductsRepositoryInterface } from '../repositories/products-repository.interface';
import UsersRepositoryInterface from '../../../models/users/repositories/users.repository.interface';
import { UserRole } from '../../../models/users/types';

@injectable()
class FindProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepositoryInterface,
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
  ) {}
  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFound('user not found');
    }

    if (user.role === UserRole.AGENT) {
      const products = await this.productsRepository.find();

      if (!products?.length) {
        throw new NotFound('No products found in database');
      }

      return products;
    }

    const products = await this.productsRepository.findByUserId(userId);

    if (!products?.length) {
      throw new NotFound('No products found for this user');
    }

    return products;
  }
}

export default FindProductsService;
