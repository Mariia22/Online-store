import { TEXT } from './../../../common/ts/const/consts.const';
import { NodeControl } from '../../../common/ts/classes/node';

export class EmptyProductCard extends NodeControl {
  constructor(parentNode: HTMLElement) {
    const content = `<p class=product__name>${TEXT.MESSAGE.NOT_FOUND_PRODUCT_MESSAGE}</p>`;
    super(parentNode, 'div', 'product', content);
  }
}
