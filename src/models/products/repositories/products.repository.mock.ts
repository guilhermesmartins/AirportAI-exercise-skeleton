import { getModelForClass } from '@typegoose/typegoose';
import { addHours, isAfter, isBefore, subHours } from 'date-fns';

import { Product, ProductDocument } from '../entities/product';
import CreateProductDTO from '../dtos/create-product.dto';
import DeleteProductDTO from '../dtos/delete-product.dto';
import FindOneProductDTO from '../bos/find-one-product.bo';
import { ProductsRepositoryInterface } from './products-repository.interface';
import FindByKeywordDTO from '../dtos/find-by-keyword.dto';
import FindOneProductBO from '../dtos/find-one-product.dto';

class ProductsRepositoryMock implements ProductsRepositoryInterface {
  private products: ProductDocument[];

  constructor() {
    this.products = [];
  }

  async findOneByIdAndUserId({
    id,
    userId,
  }: FindOneProductBO): Promise<ProductDocument | null> {
    const product = this.products.find(
      p => p.userId.toString() === userId && p._id.toString() === id,
    );

    if (!product) {
      return null;
    }

    return product;
  }

  async findByUserId(userId: string): Promise<ProductDocument[] | null> {
    const products = this.products.filter(
      p => p.userId.toString() === userId.toString(),
    );

    if (!products?.length) {
      return null;
    }

    return products;
  }

  async find(): Promise<ProductDocument[] | null> {
    return this.products;
  }

  async findByKeywordsAndUserId({
    userId,
    lostTime,
    message,
  }: FindByKeywordDTO): Promise<ProductDocument[] | null> {
    const products = this.products.filter(p => {
      let match = false;
      const fullText = p.type + p.color + p.title + p.brand;

      if (message && message.includes(fullText)) {
        match = true;
      }

      if (
        lostTime &&
        isAfter(lostTime, subHours(lostTime, 1)) &&
        isBefore(lostTime, addHours(lostTime, 1))
      ) {
        match = true;
      }

      if (p._id.toString() === userId) {
        match = true;
      }

      return match;
    });

    if (!products.length) {
      return null;
    }

    return products;
  }

  async create(
    createProductDTO: CreateProductDTO,
  ): Promise<ProductDocument | null> {
    const productModel = getModelForClass(Product);

    const product = new productModel(createProductDTO);

    this.products.push(product);

    return product;
  }

  async findOne(
    findOneProductDTO: FindOneProductDTO,
  ): Promise<ProductDocument | null> {
    const product = this.products.find(
      p => (p._id as any) === findOneProductDTO.id,
    );

    if (!product) {
      return null;
    }

    return product;
  }

  async findByKeywords({
    lostTime,
    message,
  }: FindByKeywordDTO): Promise<ProductDocument[] | null> {
    // a "full text search"
    const products = this.products.filter(p => {
      let match = false;
      const fullText = p.type + p.color + p.title + p.brand;

      if (message && message.includes(fullText)) {
        match = true;
      }

      if (
        lostTime &&
        isAfter(lostTime, subHours(lostTime, 1)) &&
        isBefore(lostTime, addHours(lostTime, 1))
      ) {
        match = true;
      }

      return match;
    });

    if (!products.length) {
      return null;
    }

    return products;
  }

  async delete(deleteProductDTO: DeleteProductDTO): Promise<void> {
    const products = this.products.filter(
      p => p._id.toString() !== deleteProductDTO.id,
    );

    this.products = products;
  }
}

export default ProductsRepositoryMock;
