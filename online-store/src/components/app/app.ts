import { AppView } from '../view/app-view';
import { ProductController } from './../controller/controller';
import { StoreState } from '../controller/state';

export class App {
  private controller: ProductController;

  constructor() {
    this.controller = new ProductController();
  }

  async init(state: StoreState) {
    await this.controller
      .getProducts()
      .then((res) => {
        state.getProductsList({ products: res });
      })
      .then(() => new AppView(state))
      .catch(() => {
        console.log('Server is not available');
      });
  }
}
