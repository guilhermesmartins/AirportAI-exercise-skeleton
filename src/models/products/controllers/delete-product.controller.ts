import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteProductService from '../services/delte-product.service';

class DeleteProductController {
  async execute(req: Request, res: Response) {
    const { id } = req.params;

    const deleteProductService = container.resolve(DeleteProductService);

    await deleteProductService.execute({ id });

    res.status(200).json({});
  }
}

export default DeleteProductController;
