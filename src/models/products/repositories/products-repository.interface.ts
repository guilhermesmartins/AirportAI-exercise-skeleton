import { Product } from '@prisma/client';

import CreateProductDTO from '../dtos/create-product.dto';
import DeleteProductDTO from '../dtos/delete-product.dto';
import FindOneProductDTO from '../dtos/find-one-product.dto';
import FindProductsDTO from '../dtos/find-products.dto';

export interface ProductsRepositoryInterface {
  create(createProductDTO: CreateProductDTO): Promise<Product>;
  findOne(findOneProductDTO: FindOneProductDTO): Promise<Product | undefined>;
  find(findProductsDTO: FindProductsDTO): Promise<Product[] | undefined>;
  delete(deleteProductDTO: DeleteProductDTO): Promise<boolean>;
}
