import { StoreState } from '../../controller/state';
import { EmptyProductCard } from '../empty-product-card/empty-product-card';
import { ProductCard } from '../product-components/product';
import { Product } from '../../../common/ts/interfaces/product.interface';
import { NodeControl } from '../../../common/ts/classes/node';

export class ProductList extends NodeControl {
  constructor(parentNode: HTMLElement, private state: StoreState) {
    super(parentNode, 'div', 'product__list');
  }

  set content(value: Product[]) {
    this.node.innerHTML = '';
    if (value.length > 0) {
      value.forEach((product: Product) => {
        new ProductCard(this.node, product, this.state);
      });
    } else {
      new EmptyProductCard(this.node);
    }
  }
}
