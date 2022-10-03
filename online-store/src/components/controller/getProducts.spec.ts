import { products as expected, getProducts } from './products-db';

describe('getProducts', () => {
  it('should return all the data', async () => {
    const received = await getProducts();
    expect(received).toEqual(expected);
  });
});
