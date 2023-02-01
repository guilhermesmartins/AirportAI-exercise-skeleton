import { Product } from '@prisma/client';
import { ObjectId } from 'mongodb';

import CreateProductDTO from '../dtos/create-product.dto';
import DeleteProductDTO from '../dtos/delete-product.dto';
import FindOneProductDTO from '../dtos/find-one-product.dto';
import FindProductsDTO from '../dtos/find-products.dto';

import { ProductsRepositoryInterface } from './products-repository.interface';

class ProductsRepositoryMock implements ProductsRepositoryInterface {
  private products: Product[];

  constructor() {
    this.products = [];
  }

  async create(createProductDTO: CreateProductDTO): Promise<Product> {
    const product: Product = {
      id: new ObjectId().toString(),
      ...createProductDTO,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.products.push(product);

    return product;
  }

  findOne(_findOneProductDTO: FindOneProductDTO): Promise<Product | undefined> {
    throw new Error('Method not implemented.');
  }
  find(_findProductsDTO: FindProductsDTO): Promise<Product[] | undefined> {
    throw new Error('Method not implemented.');
  }
  delete(_deleteProductDTO: DeleteProductDTO): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

export default ProductsRepositoryMock;
