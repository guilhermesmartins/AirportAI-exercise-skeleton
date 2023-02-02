import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import FindByKeywordDTO from '../dtos/find-by-keyword.dto';

import FindByKeywordService from '../services/find-by-keyword.service';

class FindByKeywordController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { message, lostTime } = req.query;

      console.log(`message`, message);

      const findByKeywordService = container.resolve(FindByKeywordService);

      let findByKeywordsData = {} as FindByKeywordDTO;

      if (message) {
        findByKeywordsData.message = message.toString().trim();
      }

      if (lostTime && typeof lostTime === 'string') {
        findByKeywordsData.lostTime = new Date(lostTime.trim());
      }

      const products = await findByKeywordService.execute(findByKeywordsData);

      res.status(200).send({ products });
    } catch (err) {
      next(err);
    }
  }
}

export default FindByKeywordController;
