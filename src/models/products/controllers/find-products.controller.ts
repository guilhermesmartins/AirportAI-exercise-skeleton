import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import FindProductsService from '../services/find-products.service';

class FindProductsController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;

      const findProductsService = container.resolve(FindProductsService);

      const products = await findProductsService.execute(id);

      res.status(200).send({ products });
    } catch (err) {
      return next(err);
    }
  }
}

export default FindProductsController;
