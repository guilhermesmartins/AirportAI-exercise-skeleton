import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import FindOneProductService from '../services/find-one-product.service';

class FindOneProductController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const findOneProductService = container.resolve(FindOneProductService);

      const product = await findOneProductService.execute({ id });

      res.status(200).send({ product });
    } catch (err) {
      next(err);
    }
  }
}

export default FindOneProductController;
