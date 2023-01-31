import { PrismaClient, Product } from '@prisma/client';
import CreateProductDTO from '../dtos/create-product.dto';
import DeleteProductDTO from '../dtos/delete-product.dto';
import FindOneProductDTO from '../dtos/find-one-product.dto';
import FindProductsDTO from '../dtos/find-products.dto';
import { ProductsRepositoryInterface } from './products-repository.interface';

class ProductsRepository implements ProductsRepositoryInterface {
  private repository: PrismaClient;

  constructor() {
    this.repository = new PrismaClient();
  }
  find(findProductsDTO: FindProductsDTO): Promise<Product[] | undefined> {
    throw new Error('Method not implemented.');
  }

  findOne(findOneProductDTO: FindOneProductDTO): Promise<Product | undefined> {
    throw new Error('Method not implemented.');
  }

  delete(deleteProductDTO: DeleteProductDTO): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async create(createProductDTO: CreateProductDTO): Promise<Product> {
    const product = await this.repository.product.create({
      data: createProductDTO,
    });

    return product;
  }
}

export default ProductsRepository;
