import { StoreState } from '../../controller/state';
import { Product } from '../../../common/ts/interfaces/product.interface';
import { NodeControl } from '../../../common/ts/classes/node';
import { RemoveFromCartButton } from '../buttons-components/remove-from-cart/remove-from-cart';

export class ProductButtonList extends NodeControl {
  private removeButton: RemoveFromCartButton;

  constructor(parentNode: HTMLElement, product: Product, state: StoreState) {
    super(parentNode, 'div', 'product__button__list');
    this.removeButton = new RemoveFromCartButton(this.node, state, product);
  }
}
