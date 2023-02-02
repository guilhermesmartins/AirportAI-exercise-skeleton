import 'reflect-metadata';
import { ObjectId } from 'mongodb';
import { NotFound } from 'http-errors';

import { ProductsRepositoryInterface } from '../repositories/products-repository.interface';
import ProductsRepositoryMock from '../repositories/products.repository.mock';
import CreateProductService from './create-product.service';
import FindOneProductService from './find-one-product.service';

let findOneProductService: FindOneProductService;
let createProductService: CreateProductService;
let productsRepository: ProductsRepositoryInterface;

describe('Find One Product', () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryMock();
    findOneProductService = new FindOneProductService(productsRepository);
  });

  it('should be able to find a existing product', async () => {
    createProductService = new CreateProductService(productsRepository);

    const existingProduct = await createProductService.execute({
      brand: 'toblerone',
      color: 'brown',
      lostTime: new Date(),
      owner: 'John Doe',
      title: 'toblerone do John DOe',
      type: 'chocolate',
    });

    const productId = existingProduct._id as any;

    if (!productId) {
      throw new Error('Not able to create product');
    }

    const foundProduct = await findOneProductService.execute({ id: productId });

    expect(foundProduct._id).toEqual(productId);
  });

  it('should not be able to find a non existing product', () => {
    expect(async () => {
      const randomId = new ObjectId();

      await findOneProductService.execute({
        id: randomId.toString(),
      });
    }).rejects.toBeInstanceOf(NotFound);
  });
});
