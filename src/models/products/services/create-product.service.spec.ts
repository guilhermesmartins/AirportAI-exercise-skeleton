import 'reflect-metadata';
import { NotFound } from 'http-errors';

import { UserRole } from '../../../models/users/types';
import UsersRepositoryInterface from '../../../models/users/repositories/users.repository.interface';
import UsersRepositoryMock from '../../../models/users/repositories/users.repository.mock';
import CreateUserService from '../../../models/users/services/create-user.service';
import { ProductsRepositoryInterface } from '../repositories/products-repository.interface';
import ProductsRepositoryMock from '../repositories/products.repository.mock';
import CreateProductService from './create-product.service';

let createProductService: CreateProductService;
let createUserService: CreateUserService;
let productsRepository: ProductsRepositoryInterface;
let usersRepository: UsersRepositoryInterface;

describe('Create Product', () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryMock();
    usersRepository = new UsersRepositoryMock();

    createProductService = new CreateProductService(
      productsRepository,
      usersRepository,
    );
  });

  it('should be able to create a new product', async () => {
    createUserService = new CreateUserService(usersRepository);

    const userMail = 'johndoe@false.com';

    const user = await createUserService.execute({
      email: userMail,
      name: 'John Doe',
      password: '123456',
      role: UserRole.PASSENGER,
    });

    const product = await createProductService.execute({
      brand: 'Discord',
      color: 'purple',
      lostTime: new Date(),
      ownerEmail: userMail,
      title: 'Discord phone',
      type: 'eletronic',
    });

    expect(product).toHaveProperty('_id');
    expect(product.userId).toEqual(user._id.toString());
  });

  it('should not able to create a product with wrong user mail', () => {
    expect(async () => {
      await createProductService.execute({
        brand: 'Discord',
        color: 'purple',
        lostTime: new Date(),
        ownerEmail: 'fakemail@net.com',
        title: 'Discord phone',
        type: 'eletronic',
      });
    }).rejects.toBeInstanceOf(NotFound);
  });
});
