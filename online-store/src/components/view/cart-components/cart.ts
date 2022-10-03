import { CartItem } from '../../../common/ts/interfaces/cart-item.interface';
import { NodeControl } from '../../../common/ts/classes/node';

export class Cart extends NodeControl {
  constructor(parentNode: HTMLElement, cart: CartItem) {
    const content = `<li class=cart__name>${cart.name}</li>
    <li class=cart__number>${cart.number}</li>`;
    super(parentNode, 'ul', 'cart', content);
  }
}
