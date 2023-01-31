import { Router } from 'express';

class ProductsRoutes {
  execute() {
    const router = Router();

    router.get('/');
  }
}

export default ProductsRoutes;
