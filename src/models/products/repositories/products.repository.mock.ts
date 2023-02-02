import { Product, ProductDocument } from '../entities/product';
import CreateProductDTO from '../dtos/create-product.dto';
import DeleteProductDTO from '../dtos/delete-product.dto';
import FindOneProductDTO from '../dtos/find-one-product.dto';
import FindProductsDTO from '../dtos/find-products.dto';
import { ProductsRepositoryInterface } from './products-repository.interface';
import FindByKeywordDTO from '../dtos/find-by-keyword.dto';

class ProductsRepositoryMock implements ProductsRepositoryInterface {
  private products: Array<Product & ProductDocument>;

  constructor() {
    this.products = [];
  }

  async create(
    createProductDTO: CreateProductDTO,
  ): Promise<ProductDocument | null> {
    const productModel = new Product().getModelForClass(Product);

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
    brand,
    color,
    lostTime,
    owner,
    title,
    type,
  }: FindByKeywordDTO): Promise<ProductDocument[] | null> {
    const product = this.products.find(p => {
      let match = true;
      if (brand) {
        match = match && p.brand === brand;
      }
      if (color) {
        match = match && p.color === color;
      }
      if (lostTime) {
        match = match && p.lostTime === lostTime;
      }
      if (owner) {
        match = match && p.owner === owner;
      }
      if (title) {
        match = match && p.title === title;
      }
      if (type) {
        match = match && p.type === type;
      }
      return match;
    });

    if (!product) {
      return null;
    }

    return product as any;
  }

  find(_findProductsDTO: FindProductsDTO): Promise<ProductDocument[] | null> {
    throw new Error('Method not implemented.');
  }
  delete(_deleteProductDTO: DeleteProductDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default ProductsRepositoryMock;
