import CreateProductDTO from '../dtos/create-product.dto';
import DeleteProductDTO from '../dtos/delete-product.dto';
import FindByKeywordDTO from '../dtos/find-by-keyword.dto';
import FindOneProductDTO from '../dtos/find-one-product.dto';
import FindProductsDTO from '../dtos/find-products.dto';
import { Product, ProductDocument } from '../entities/product';
import { ProductsRepositoryInterface } from './products-repository.interface';

interface KeywordsFilter {
  brand?: string;
  color?: string;
  owner?: string;
  title?: string;
  type?: string;
  lostTime?: Date;
}

class ProductsRepository implements ProductsRepositoryInterface {
  private repository;

  constructor() {
    this.repository = new Product().getModelForClass(Product, {
      schemaOptions: { timestamps: true },
    });
  }

  async findByKeywords({
    brand,
    color,
    owner,
    title,
    type,
    lostTime,
  }: FindByKeywordDTO): Promise<ProductDocument[] | null> {
    let filters = {} as KeywordsFilter;

    if (brand) {
      filters.brand = brand;
    }

    if (color) {
      filters.color = color;
    }

    if (owner) {
      filters.owner = owner;
    }

    if (title) {
      filters.title = title;
    }

    if (type) {
      filters.type = type;
    }

    if (lostTime) {
      filters.lostTime = lostTime;
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
