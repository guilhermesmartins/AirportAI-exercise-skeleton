import { Router } from 'express';
import { ensureAdmin } from '../../../shared/middlewares/ensureAdmin';
import { ensureAuthenticated } from '../../../shared/middlewares/ensureAuthenticated';

import {
  makeValidateBody,
  makeValidateParams,
  makeValidateQueries,
} from '../../../shared/validator';
import CreateProductBO from '../bos/create-product.bo';
import CreateProductController from '../controllers/create-product.controller';
import DeleteProductController from '../controllers/delete-product.controller';
import FindByKeywordController from '../controllers/find-by-keyword.controller';
import FindOneProductController from '../controllers/find-one-product.controller';
import DeleteProductDTO from '../dtos/delete-product.dto';
import FindOneProductBO from '../bos/find-one-product.bo';
import FindProductsController from '../controllers/find-products.controller';
import FindByKeywordsProductBO from '../bos/find-by-keywords-product.bo';

class ProductsRoutes {
  execute() {
    const router = Router();

    const createProductController = new CreateProductController();

    router.post(
      '/',
      ensureAuthenticated,
      ensureAdmin,
      makeValidateBody(CreateProductBO),
      createProductController.execute,
    );

    const findOneProductController = new FindOneProductController();

    const findByKeywordController = new FindByKeywordController();

    router.get(
      '/keyword',
      ensureAuthenticated,
      makeValidateQueries(FindByKeywordsProductBO),
      findByKeywordController.execute,
    );

    const findProductsController = new FindProductsController();

    router.get('/', ensureAuthenticated, findProductsController.execute);

    router.get(
      '/:id',
      ensureAuthenticated,
      makeValidateParams(FindOneProductBO),
      findOneProductController.execute,
    );

    const deleteProductController = new DeleteProductController();

    router.delete(
      '/:id',
      ensureAuthenticated,
      ensureAdmin,
      makeValidateParams(DeleteProductDTO),
      deleteProductController.execute,
    );

    return router;
  }
}

export default ProductsRoutes;
