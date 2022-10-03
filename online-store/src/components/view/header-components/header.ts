import { StoreState } from '../../controller/state';
import { NodeControl } from '../../../common/ts/classes/node';
import { Search } from '../search-components/search';

export class Header extends NodeControl {
  private search: Search;

  constructor(parentNode: HTMLElement, state: StoreState) {
    const logo = './assets/img/logo.svg';
    const cart = './assets/img/shopping-cart.png';
    const content = `<div class='header__logo'><img src=${logo} class='header__logo__img'/></div>
    <div class='header__container'>
    <div class='header__cart__icon'><img src=${cart} class='header__cart__img'/>
    <div class='header__cart'></div>
    </div>
    <div class='header__cart__list__error'></div>
    </div>`;
    super(parentNode, 'header', 'header wrapper', content);
    this.search = new Search(document.querySelector('.header__container') as HTMLElement, state);
  }
}
