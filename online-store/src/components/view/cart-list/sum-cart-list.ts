import { NodeControl } from '../../../common/ts/classes/node';

export class CartListSum extends NodeControl {
  constructor(parentNode: HTMLElement, totalNumber: number) {
    const content = `<div class = 'header__cart__list__sum'>${totalNumber}</div>`;
    super(parentNode, 'div', 'header__cart__list__sum', content);
  }
}
