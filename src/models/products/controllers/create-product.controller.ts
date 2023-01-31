import { Request, Response } from 'express';

class CreateProductController {
  async execute(req: Request, res: Response) {
    const product = req.body;

    return res.json({ product });
  }
}

export default CreateProductController;
