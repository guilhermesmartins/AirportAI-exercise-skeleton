import { injectable, inject } from 'tsyringe';
import { NotFound } from 'http-errors';

import FindOneProductDTO from '../dtos/find-one-product.dto';
import { ProductsRepositoryInterface } from '../repositories/products-repository.interface';
import { UserRole } from '../../../models/users/types';
import UsersRepositoryInterface from 'src/models/users/repositories/users.repository.interface';

@injectable()
class FindOneProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepositoryInterface,
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
  ) {}

  async execute(findOneProductDTO: FindOneProductDTO) {
    const user = await this.usersRepository.findById(findOneProductDTO.userId);

    if (!user) {
      throw new NotFound('user not found');
    }

    if (user.role === UserRole.PASSENGER) {
      const product = await this.productsRepository.findOneByIdAndUserId(
        findOneProductDTO,
      );

      if (!product) {
        throw new NotFound('Product not found');
      }

      return product;
    }

    const product = await this.productsRepository.findOne(findOneProductDTO);

    if (!product) {
      throw new NotFound('Product not found');
    }

    return product;
  }
}

export default FindOneProductService;
