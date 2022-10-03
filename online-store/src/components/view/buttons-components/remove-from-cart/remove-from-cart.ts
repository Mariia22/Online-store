import { Product } from '../../../../common/ts/interfaces/product.interface';
import { StoreState } from '../../../controller/state';
import { NodeControl } from '../../../../common/ts/classes/node';
import { TEXT } from '../../../../common/ts/const/consts.const';

export class RemoveFromCartButton extends NodeControl {
  constructor(parentNode: HTMLElement, private state: StoreState, product: Product) {
    super(parentNode, 'button', 'button product__from__cart');
    this.node.textContent = TEXT.INTERFACE.RESET_BUTTON;
    this.node.onclick = () => {
      this.removeFromCart(product);
    };
  }

  private removeFromCart(product: Product) {
    const updatedCart = this.state.cart.filter((item) => item.name !== product.name);
    product.inCart = false;
    this.state.changeState({ cart: updatedCart });
  }
}
