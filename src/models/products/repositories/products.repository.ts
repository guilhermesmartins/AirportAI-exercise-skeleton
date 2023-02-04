import { getModelForClass } from '@typegoose/typegoose';
import { addHours, subHours } from 'date-fns';

import CreateProductDTO from '../dtos/create-product.dto';
import DeleteProductDTO from '../dtos/delete-product.dto';
import FindByKeywordDTO from '../dtos/find-by-keyword.dto';
import FindOneProductDTO from '../dtos/find-one-product.dto';
import { Product, ProductDocument } from '../entities/product';
import { ProductsRepositoryInterface } from './products-repository.interface';
interface FindByKeywordsFilter {
  $text?: {
    $search: string;
  };

  lostTime?: {
    $gte: Date;
    $lte: Date;
  };

  userId?: string;
}

class ProductsRepository implements ProductsRepositoryInterface {
  private repository;

  constructor() {
    this.repository = getModelForClass(Product, {
      schemaOptions: { timestamps: true },
    });

    this.repository.collection
      .createIndexes([
        {
          key: {
            type: 'text',
            color: 'text',
            title: 'text',
            brand: 'text',
          },
        },
      ])
      .then();
  }

  async findByUserId(userId: string): Promise<ProductDocument[] | null> {
    const products = await this.repository.find({
      userId,
    });

    return products;
  }

  async findByKeywords({
    message,
    lostTime,
  }: FindByKeywordDTO): Promise<ProductDocument[] | null> {
    let filters = {} as FindByKeywordsFilter;

    if (message) {
      filters.$text = {
        $search: message,
      };
    }

    if (lostTime) {
      filters.lostTime = {
        $gte: subHours(lostTime, 1),
        $lte: addHours(lostTime, 1),
      };
    }

    const products = await this.repository.find(filters);

    return products;
  }

  async findByKeywordsAndUserId(findByKeywordDTO: FindByKeywordDTO) {
    const { userId, lostTime, message } = findByKeywordDTO;

    let filters = {} as FindByKeywordsFilter;

    filters.userId = userId;

    if (message) {
      filters.$text = {
        $search: message,
      };
    }

    if (lostTime) {
      filters.lostTime = {
        $gte: subHours(lostTime, 1),
        $lte: addHours(lostTime, 1),
      };
    }

    const products = await this.repository.find(filters);

    return products;
  }

  async find(): Promise<ProductDocument[] | null> {
    const products = await this.repository.find({});

    return products;
  }

  async findOneByIdAndUserId({
    id,
    userId,
  }: FindOneProductDTO): Promise<ProductDocument | null> {
    const product = await this.repository.findOne({
      _id: id,
      userId,
    });

    return product;
  }

  async findOne(
    findOneProductDTO: FindOneProductDTO,
  ): Promise<ProductDocument | null> {
    const product = await this.repository.findById(findOneProductDTO.id);

    return product;
  }

  async create(
    createProductDTO: CreateProductDTO,
  ): Promise<ProductDocument | null> {
    const product = await this.repository.create(createProductDTO);

    await product.save();

    return product;
  }

  async delete({ id }: DeleteProductDTO): Promise<void> {
    await this.repository.deleteOne({
      id,
    });
  }
}

export default ProductsRepository;
