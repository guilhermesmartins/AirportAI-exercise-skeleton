import 'reflect-metadata';
import { ObjectId } from 'mongodb';
import { NotFound } from 'http-errors';

import { ProductsRepositoryInterface } from '../repositories/products-repository.interface';
import ProductsRepositoryMock from '../repositories/products.repository.mock';
import CreateProductService from './create-product.service';
import FindOneProductService from './find-one-product.service';
import UsersRepositoryInterface from '../../../models/users/repositories/users.repository.interface';
import UsersRepositoryMock from '../../../models/users/repositories/users.repository.mock';
import CreateUserService from '../../../models/users/services/create-user.service';
import { UserRole } from '../../../models/users/types';

let findOneProductService: FindOneProductService;
let createProductService: CreateProductService;
let productsRepository: ProductsRepositoryInterface;
let usersRepository: UsersRepositoryInterface;

describe('Find One Product', () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryMock();
    usersRepository = new UsersRepositoryMock();
    findOneProductService = new FindOneProductService(
      productsRepository,
      usersRepository,
    );
  });

  it('should not be able to find a product from non existing user', () => {
    expect(async () => {
      const randomId = new ObjectId();

      await findOneProductService.execute({
        id: randomId.toString(),
        userId: randomId.toString(),
      });
    }).rejects.toBeInstanceOf(NotFound);
  });

  describe('With a existing PASSENGER user', () => {
    it('should be able to find a existing product', async () => {
      createProductService = new CreateProductService(
        productsRepository,
        usersRepository,
      );
      const createUserService = new CreateUserService(usersRepository);

      const userEmail = 'johndoe@gmail.com';

      const user = await createUserService.execute({
        email: userEmail,
        name: 'John Doe',
        password: '123456',
        role: UserRole.PASSENGER,
      });

      const existingProduct = await createProductService.execute({
        brand: 'toblerone',
        color: 'brown',
        lostTime: new Date(),
        ownerEmail: userEmail,
        title: 'toblerone do John DOe',
        type: 'chocolate',
      });

      const productId = existingProduct._id;

      if (!productId) {
        throw new Error('Not able to create product');
      }

      const foundProduct = await findOneProductService.execute({
        id: productId.toString(),
        userId: user._id.toString(),
      });

      expect(foundProduct._id).toEqual(productId);
    });

    it('should not be able to find a non existing product', () => {
      expect(async () => {
        createProductService = new CreateProductService(
          productsRepository,
          usersRepository,
        );
        const createUserService = new CreateUserService(usersRepository);

        const userEmail = 'johndoe@gmail.com';

        await createUserService.execute({
          email: userEmail,
          name: 'John Doe',
          password: '123456',
          role: UserRole.PASSENGER,
        });

        await createProductService.execute({
          brand: 'toblerone',
          color: 'brown',
          lostTime: new Date(),
          ownerEmail: userEmail,
          title: 'toblerone do John DOe',
          type: 'chocolate',
        });
      }).rejects.toBeInstanceOf(NotFound);
    });
  });

  describe('With a existing NON PASSENGER user', () => {
    it('should be able to find a existing product', async () => {
      createProductService = new CreateProductService(
        productsRepository,
        usersRepository,
      );
      const createUserService = new CreateUserService(usersRepository);

      const userEmail = 'johndoe@gmail.com';

      const user = await createUserService.execute({
        email: userEmail,
        name: 'John Doe',
        password: '123456',
        role: UserRole.AGENT,
      });

      const existingProduct = await createProductService.execute({
        brand: 'toblerone',
        color: 'brown',
        lostTime: new Date(),
        ownerEmail: userEmail,
        title: 'toblerone do John DOe',
        type: 'chocolate',
      });

      const productId = existingProduct._id;

      if (!productId) {
        throw new Error('Not able to create product');
      }

      const foundProduct = await findOneProductService.execute({
        id: productId,
        userId: user._id.toString(),
      });

      expect(foundProduct._id).toEqual(productId);
    });

    it('should not be able to find a non existing product', () => {
      expect(async () => {
        createProductService = new CreateProductService(
          productsRepository,
          usersRepository,
        );
        const createUserService = new CreateUserService(usersRepository);

        const userEmail = 'johndoe@gmail.com';

        await createUserService.execute({
          email: userEmail,
          name: 'John Doe',
          password: '123456',
          role: UserRole.AGENT,
        });

        await createProductService.execute({
          brand: 'toblerone',
          color: 'brown',
          lostTime: new Date(),
          ownerEmail: userEmail,
          title: 'toblerone do John DOe',
          type: 'chocolate',
        });
      }).rejects.toBeInstanceOf(NotFound);
    });
  });
});
