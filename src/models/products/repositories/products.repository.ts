import { addHours, subHours } from 'date-fns';
import CreateProductDTO from '../dtos/create-product.dto';
import DeleteProductDTO from '../dtos/delete-product.dto';
import FindByKeywordDTO from '../dtos/find-by-keyword.dto';
import FindOneProductDTO from '../dtos/find-one-product.dto';
import FindProductsDTO from '../dtos/find-products.dto';
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
}

class ProductsRepository implements ProductsRepositoryInterface {
  private repository;

  constructor() {
    this.repository = new Product().getModelForClass(Product, {
      schemaOptions: { timestamps: true },
    });

    this.repository.collection
      .createIndexes([
        {
          key: {
            type: 'text',
            color: 'text',
            title: 'text',
            owner: 'text',
            brand: 'text',
          },
        },
      ])
      .then();
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

  find(_findProductsDTO: FindProductsDTO): Promise<ProductDocument[] | null> {
    throw new Error('Method not implemented.');
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
