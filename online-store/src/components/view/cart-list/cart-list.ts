import { CartItem } from '../../../common/ts/interfaces/cart-item.interface';
import { Cart } from '../cart-components/cart';
import { NodeControl } from '../../../common/ts/classes/node';
import { CartListSum } from './sum-cart-list';

export class CartList extends NodeControl {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'cart__list');
  }

  set content(value: CartItem[]) {
    this.node.innerHTML = '';
    if (value.length > 0) {
      value.forEach((item: CartItem) => {
        new Cart(this.node, item);
      });
      const totalNumber = value.reduce((acc: number, cart: CartItem) => {
        acc += Number(cart.number);
        return acc;
      }, 0);
      document.querySelector('.header__cart__list__sum')?.remove();
      new CartListSum(document.querySelector('.header__container') as HTMLElement, totalNumber);
    } else {
      document.querySelector('.header__cart__list__sum')?.remove();
    }
  }
}
