import { container } from 'tsyringe';
import { ProductsRepositoryInterface } from '../../models/products/repositories/products-repository.interface';
import ProductsRepository from '../../models/products/repositories/products.repository';
import UsersRepository from '../../models/users/repositories/users.repository';
import UsersRepositoryInterface from '../../models/users/repositories/users.repository.interface';

container.registerSingleton<ProductsRepositoryInterface>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<UsersRepositoryInterface>(
  'UsersRepository',
  UsersRepository,
);
