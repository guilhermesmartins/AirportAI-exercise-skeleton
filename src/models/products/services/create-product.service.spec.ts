import 'reflect-metadata';

import { ProductsRepositoryInterface } from '../repositories/products-repository.interface';
import ProductsRepositoryMock from '../repositories/products.repository.mock';
import CreateProductService from './create-product.service';

let createProductService: CreateProductService;
let productsRepository: ProductsRepositoryInterface;

describe('Create Product', () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryMock();
    createProductService = new CreateProductService(productsRepository);
  });

  it('should be able to create a new product', async () => {
    const product = await createProductService.execute({
      color: 'red',
      lostTime: new Date(),
      title: 'Samsung S9',
      type: 'smartphone',
      owner: 'John Doe',
      brand: 'Samsung',
    });

    expect(product).toHaveProperty('_id');
  });
});
