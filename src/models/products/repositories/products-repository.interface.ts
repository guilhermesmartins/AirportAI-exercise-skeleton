import { ProductDocument } from '../entities/product';

import CreateProductDTO from '../dtos/create-product.dto';
import DeleteProductDTO from '../dtos/delete-product.dto';
import FindOneProductDTO from '../dtos/find-one-product.dto';
import FindByKeywordDTO from '../dtos/find-by-keyword.dto';

export interface ProductsRepositoryInterface {
  create(createProductDTO: CreateProductDTO): Promise<ProductDocument | null>;
  findOne(
    findOneProductDTO: FindOneProductDTO,
  ): Promise<ProductDocument | null>;
  findOneByIdAndUserId(
    findOneProductDTO: FindOneProductDTO,
  ): Promise<ProductDocument | null>;
  findByUserId(userId: string): Promise<ProductDocument[] | null>;
  find(): Promise<ProductDocument[] | null>;
  findByKeywords(
    findByKeywords: FindByKeywordDTO,
  ): Promise<ProductDocument[] | null>;
  findByKeywordsAndUserId(
    findByKeywords: FindByKeywordDTO,
  ): Promise<ProductDocument[] | null>;
  delete(deleteProductDTO: DeleteProductDTO): Promise<void>;
}
