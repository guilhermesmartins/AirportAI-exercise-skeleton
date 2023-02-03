import { NotFound } from 'http-errors';
import { ObjectId } from 'mongodb';

import UsersRepositoryInterface from '../../../models/users/repositories/users.repository.interface';
import UsersRepositoryMock from '../../../models/users/repositories/users.repository.mock';
import { ProductsRepositoryInterface } from '../repositories/products-repository.interface';
import ProductsRepositoryMock from '../repositories/products.repository.mock';
import FindProductsService from './find-products.service';
import CreateProductService from './create-product.service';
import CreateUserService from '../../../models/users/services/create-user.service';
import { UserRole } from '../../../models/users/types';

let findProductsService: FindProductsService;
let productsRepository: ProductsRepositoryInterface;
let createUserService: CreateUserService;
let usersRepository: UsersRepositoryInterface;
let createProductService: CreateProductService;

describe('Find Products', () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryMock();
    usersRepository = new UsersRepositoryMock();
    findProductsService = new FindProductsService(
      productsRepository,
      usersRepository,
    );
    createProductService = new CreateProductService(
      productsRepository,
      usersRepository,
    );
  });

  it('should not be able to find products with non existing user', async () => {
    expect(async () => {
      const randomId = new ObjectId();
      await findProductsService.execute(randomId.toString());
    }).rejects.toBeInstanceOf(NotFound);
  });

  describe('With a existing NON PASSENGER user', () => {
    it('should not able to retrieve non existing products', async () => {
      expect(async () => {
        const user = await createUserService.execute({
          email: 'johndoe@doe.com',
          name: 'John Doe',
          password: '123456',
          role: UserRole.AGENT,
        });

        await findProductsService.execute(user._id.toString());
      }).rejects.toBeInstanceOf(NotFound);
    });

    // when user is not PASSENGER, you can retrieve all products, despite needing to pass userId in service
    it('should be able to return all products', async () => {
      const firstUserMail = 'johndoe@doe.com';
      const firstUser = await createUserService.execute({
        email: firstUserMail,
        name: 'John Doe',
        password: '123456',
        role: UserRole.AGENT,
      });

      const secondUserMail = 'johndoe2@doe.com';
      await createUserService.execute({
        email: 'johndoe2@doe.com',
        name: 'John Doe',
        password: '123456',
        role: UserRole.AGENT,
      });

      await createProductService.execute({
        brand: 'toblerone',
        color: 'brown',
        lostTime: new Date(),
        ownerEmail: firstUserMail,
        title: 'toblerone do John DOe',
        type: 'chocolate',
      });

      await createProductService.execute({
        brand: 'kitkat',
        color: 'brown',
        lostTime: new Date(),
        ownerEmail: secondUserMail,
        title: 'kitkat do John DOe2',
        type: 'chocolate',
      });

      const products = await findProductsService.execute(
        firstUser._id.toString(),
      );

      expect(products.length).toEqual(2);
    });
  });

  describe('With a existing PASSENGER user', () => {
    it('should not able to retrieve non existing products', async () => {
      expect(async () => {
        const user = await createUserService.execute({
          email: 'johndoe@doe.com',
          name: 'John Doe',
          password: '123456',
          role: UserRole.AGENT,
        });

        await findProductsService.execute(user._id.toString());
      }).rejects.toBeInstanceOf(NotFound);
    });

    it('should be able to find products of this user', async () => {
      const firstUserMail = 'johndoe@doe.com';
      const firstUser = await createUserService.execute({
        email: firstUserMail,
        name: 'John Doe',
        password: '123456',
        role: UserRole.PASSENGER,
      });

      const secondUserMail = 'johndoe2@doe.com';
      await createUserService.execute({
        email: 'johndoe2@doe.com',
        name: 'John Doe',
        password: '123456',
        role: UserRole.PASSENGER,
      });

      await createProductService.execute({
        brand: 'toblerone',
        color: 'brown',
        lostTime: new Date(),
        ownerEmail: firstUserMail,
        title: 'toblerone do John DOe',
        type: 'chocolate',
      });

      await createProductService.execute({
        brand: 'kitkat',
        color: 'brown',
        lostTime: new Date(),
        ownerEmail: secondUserMail,
        title: 'kitkat do John DOe2',
        type: 'chocolate',
      });

      const products = await findProductsService.execute(
        firstUser._id.toString(),
      );

      expect(products.length).toEqual(1);
    });
  });
});
