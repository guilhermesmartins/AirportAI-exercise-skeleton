import { Router } from 'express';
import { makeValidateBody } from 'express-class-validator';

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
  }
}

export default ProductsRoutes;
