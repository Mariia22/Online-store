import { ProductFromServer } from './../../common/ts/interfaces/product.interface';
import { getProducts } from './products-db';

export class ProductController {
  getProducts(): Promise<ProductFromServer[]> {
    return getProducts();
  }
}
