import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import FindByKeywordService from '../services/find-by-keyword.service';

class FindByKeywordController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const findByKeywordData = req.body;

      const findByKeywordService = container.resolve(FindByKeywordService);

      const products = await findByKeywordService.execute(findByKeywordData);

      res.status(200).send({ products });
    } catch (err) {
      next(err);
    }
  }
}

export default FindByKeywordController;
