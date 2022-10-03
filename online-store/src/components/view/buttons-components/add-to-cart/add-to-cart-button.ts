import { NUMBER_OF_SLOTS, TEXT } from '../../../../common/ts/const/consts.const';
import { CartItem } from '../../../../common/ts/interfaces/cart-item.interface';
import { StoreState } from '../../../controller/state';
import { NodeControl } from '../../../../common/ts/classes/node';
import { Product } from '../../../../common/ts/interfaces/product.interface';
import { outputMessage } from '../../../../common/ts/functions/output-message';

export class AddToCartButton extends NodeControl {
  constructor(parentNode: HTMLElement, private state: StoreState, product: Product) {
    super(parentNode, 'button', 'button product__add__cart');
    const imgButton = `<img src='./assets/img/shopping-cart.png' class='product__add__cart__img' />`;
    this.node.innerHTML = imgButton;
    this.node.onclick = () => {
      this.addToCart(product);
    };
  }

  private addToCart(product: Product): void {
    const messageBox = document.querySelector('.header__cart__list__error') as HTMLElement;
    if (messageBox.textContent) {
      messageBox.textContent = '';
    }
    const cart: CartItem[] = [...this.state.cart];
    const products: Product[] = [...this.state.products];
    const numberOfProducts: number = cart.reduce((acc: number, item: CartItem) => {
      acc += item.number;
      return acc;
    }, 0);
    if (numberOfProducts < NUMBER_OF_SLOTS) {
      const editCart = cart.find((cart) => cart.name === product.name);
      if (editCart) {
        cart.forEach((cart) => {
          if (cart.name === product.name) {
            if (cart.number < product.amount) {
              cart.number += 1;
            } else {
              outputMessage(TEXT.MESSAGE.NOT_ENOUGH_PRODUCT_ERROR, '.header__cart__list__error');
            }
          }
        });
      } else {
        const newCart: CartItem = { name: product.name, number: 1 };
        cart.push(newCart);
        product.inCart = true;
      }
      this.state.changeState({ cart: [...cart], products: [...products] });
    } else {
      outputMessage(TEXT.MESSAGE.OVERFLOW_BASKET_ERROR, '.header__cart__list__error');
    }
  }
}
