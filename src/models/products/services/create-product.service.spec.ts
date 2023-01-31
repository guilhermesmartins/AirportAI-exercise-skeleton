import CreateProductService from './create-product.service';

let createProductService: CreateProductService;

describe('Create Product', () => {
  beforeEach(() => {
    createProductService = new CreateProductService();
  });

  it('should be able to create a new product', async () => {
    const product = await createProductService.execute({
      color: 'red',
      lostTime: new Date(),
      title: 'Samsung S9',
      type: 'smartphone',
    });

    expect(product).toHaveProperty('id');
  });
});
