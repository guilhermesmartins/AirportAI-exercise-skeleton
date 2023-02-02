import { ProductDocument } from '../entities/product';

import CreateProductDTO from '../dtos/create-product.dto';
import DeleteProductDTO from '../dtos/delete-product.dto';
import FindOneProductDTO from '../dtos/find-one-product.dto';
import FindProductsDTO from '../dtos/find-products.dto';
import FindByKeywordDTO from '../dtos/find-by-keyword.dto';

export interface ProductsRepositoryInterface {
  create(createProductDTO: CreateProductDTO): Promise<ProductDocument | null>;
  findOne(
    findOneProductDTO: FindOneProductDTO,
  ): Promise<ProductDocument | null>;
  find(findProductsDTO: FindProductsDTO): Promise<ProductDocument[] | null>;
  findByKeywords(
    findByKeywords: FindByKeywordDTO,
  ): Promise<ProductDocument[] | null>;
  delete(deleteProductDTO: DeleteProductDTO): Promise<void>;
}
