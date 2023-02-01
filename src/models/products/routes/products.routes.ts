import { Router } from 'express';
import { makeValidateBody } from 'src/shared/validator';

import CreateProductController from '../controllers/create-product.controller';
import CreateProductDTO from '../dtos/create-product.dto';

class ProductsRoutes {
  execute() {
    const router = Router();

    const createProductController = new CreateProductController();

    router.post(
      '/',
      makeValidateBody(CreateProductDTO),
      createProductController.execute,
    );

    return router;
  }
}

export default ProductsRoutes;
