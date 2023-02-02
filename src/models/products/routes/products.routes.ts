import { Router } from 'express';
import { makeValidateBody, makeValidateParams } from 'src/shared/validator';

import CreateProductController from '../controllers/create-product.controller';
import DeleteProductController from '../controllers/delete-product.controller';
import FindByKeywordController from '../controllers/find-by-keyword.controller';
import FindOneProductController from '../controllers/find-one-product.controller';
import CreateProductDTO from '../dtos/create-product.dto';
import DeleteProductDTO from '../dtos/delete-product.dto';
import FindByKeywordDTO from '../dtos/find-by-keyword.dto';
import FindOneProductDTO from '../dtos/find-one-product.dto';

class ProductsRoutes {
  execute() {
    const router = Router();

    const createProductController = new CreateProductController();

    router.post(
      '/',
      makeValidateBody(CreateProductDTO),
      createProductController.execute,
    );

    const findOneProductController = new FindOneProductController();

    router.get(
      '/:id',
      makeValidateParams(FindOneProductDTO),
      findOneProductController.execute,
    );

    const findByKeywordController = new FindByKeywordController();

    router.post(
      '/keyword',
      makeValidateBody(FindByKeywordDTO),
      findByKeywordController.execute,
    );

    const deleteProductController = new DeleteProductController();

    router.delete(
      '/:id',
      makeValidateParams(DeleteProductDTO),
      deleteProductController.execute,
    );

    return router;
  }
}

export default ProductsRoutes;
