import { injectable, inject } from 'tsyringe';
import { InternalServerError, NotFound } from 'http-errors';

import { ProductsRepositoryInterface } from '../repositories/products-repository.interface';
import CreateProductBO from '../bos/create-product.bo';
import UsersRepositoryInterface from '../../../models/users/repositories/users.repository.interface';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepositoryInterface,
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
  ) {}

  async execute(createProducBO: CreateProductBO) {
    const user = await this.usersRepository.findByEmail(
      createProducBO.ownerEmail,
    );

    if (!user) {
      throw new NotFound('user with this email not found');
    }

    const product = await this.productsRepository.create({
      ...createProducBO,
      userId: user._id,
    });

    if (!product) {
      throw new InternalServerError('Server not able to create the product');
    }

    return product;
  }
}

export default CreateProductService;
