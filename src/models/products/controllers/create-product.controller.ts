import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductService from '../services/create-product.service';

class CreateProductController {
  async execute(req: Request, res: Response) {
    const createProductData = req.body;

    const createProductService = container.resolve(CreateProductService);

    const product = await createProductService.execute(createProductData);

    return res.status(201).json({ product });
  }
}

export default CreateProductController;
