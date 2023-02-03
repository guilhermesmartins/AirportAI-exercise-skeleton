import 'reflect-metadata';
import { NotFound } from 'http-errors';

import { ProductsRepositoryInterface } from '../repositories/products-repository.interface';
import ProductsRepositoryMock from '../repositories/products.repository.mock';
import CreateProductService from './create-product.service';
import DeleteProductService from './delete-product.service';
import FindOneProductService from './find-one-product.service';
import UsersRepositoryInterface from '../../../models/users/repositories/users.repository.interface';
import UsersRepositoryMock from '../../../models/users/repositories/users.repository.mock';
import CreateUserService from '../../../models/users/services/create-user.service';
import { UserRole } from '../../../models/users/types';

let deleteProductService: DeleteProductService;
let productsRepository: ProductsRepositoryInterface;
let usersRepository: UsersRepositoryInterface;

describe('Delete Product', () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryMock();
    usersRepository = new UsersRepositoryMock();
    deleteProductService = new DeleteProductService(productsRepository);
  });

  it('should be able to delete an existing product', () => {
    expect(async () => {
      const createUserService = new CreateUserService(usersRepository);

      const createProductService = new CreateProductService(
        productsRepository,
        usersRepository,
      );
      const findOneProductService = new FindOneProductService(
        productsRepository,
        usersRepository,
      );

      const userEmail = 'johndoe@gmail.com';

      const user = await createUserService.execute({
        email: userEmail,
        name: 'John Doe',
        password: '123456',
        role: UserRole.PASSENGER,
      });

      const product = await createProductService.execute({
        color: 'red',
        lostTime: new Date(),
        title: 'Samsung S9',
        type: 'smartphone',
        ownerEmail: userEmail,
        brand: 'Samsung',
      });

      await deleteProductService.execute({ id: product._id });

      await findOneProductService.execute({
        id: product._id,
        userId: user._id.toString(),
      });
    }).rejects.toBeInstanceOf(NotFound);
  });
});
