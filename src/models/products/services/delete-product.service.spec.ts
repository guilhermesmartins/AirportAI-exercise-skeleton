import 'reflect-metadata';
import { NotFound } from 'http-errors';

import { ProductsRepositoryInterface } from '../repositories/products-repository.interface';
import ProductsRepositoryMock from '../repositories/products.repository.mock';
import CreateProductService from './create-product.service';
import DeleteProductService from './delte-product.service';
import FindOneProductService from './find-one-product.service';

let deleteProductService: DeleteProductService;
let productsRepository: ProductsRepositoryInterface;

describe('Delete Product', () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryMock();
    deleteProductService = new DeleteProductService(productsRepository);
  });

  it('should be able to delete an existing product', () => {
    expect(async () => {
      const createProductService = new CreateProductService(productsRepository);
      const findOneProductService = new FindOneProductService(
        productsRepository,
      );

      const product = await createProductService.execute({
        color: 'red',
        lostTime: new Date(),
        title: 'Samsung S9',
        type: 'smartphone',
        owner: 'John Doe',
        brand: 'Samsung',
      });

      const productId = product._id as any;

      await deleteProductService.execute({ id: productId });

      await findOneProductService.execute({ id: productId });
    }).rejects.toBeInstanceOf(NotFound);
  });
});
