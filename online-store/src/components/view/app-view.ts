import { Footer } from './footer-components/footer';
import { State } from '../../common/ts/interfaces/state.interface';
import { CartList } from './cart-list/cart-list';
import { ProductList } from './product-list/product-list';
import { StoreState } from '../controller/state';
import { Page } from './page-components/page';
import { Header } from './header-components/header';

export class AppView {
  private productList: ProductList;
  private cartList: CartList;
  private header: Header;
  private page: Page;
  private footer: Footer;

  constructor(state: StoreState) {
    this.header = new Header(document.body, state);
    this.page = new Page(document.body, state);
    this.footer = new Footer(document.body);
    this.productList = new ProductList(document.querySelector('.container') as HTMLElement, state);
    this.cartList = new CartList(document.querySelector('.header__cart') as HTMLElement);
    const update = (state: State) => {
      this.productList.content = state.products;
      this.cartList.content = state.cart;
    };
    state.onChange.add(update);
    update(state);
  }
}
