import ProductsRepository from 'src/models/products/repositories/products.repository';
import { container } from 'tsyringe';

container.registerSingleton('ProductsRepository', ProductsRepository);
