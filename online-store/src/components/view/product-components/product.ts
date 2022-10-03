import { ProductButtonList } from './product-button-list';
import { StoreState } from '../../controller/state';
import { Product } from '../../../common/ts/interfaces/product.interface';
import { NodeControl } from '../../../common/ts/classes/node';
import { AddToCartButton } from '../buttons-components/add-to-cart/add-to-cart-button';

export class ProductCard extends NodeControl {
  private productButtonList: ProductButtonList;
  private addToCartButton: AddToCartButton;

  constructor(parentNode: HTMLElement, product: Product, state: StoreState) {
    const content = `
    <img class=product__img src=${product.img} alt=${product.description}/>
    <p class=product__name>${product.name}</p>
    <p class=product__description>${product.description}</p>
    <p class=product__price>${product.price} zł</p>
    <ul class=product__options>
    <li class=product__color>Kolor: ${product.color}</li>
    <li class=product__size>Rozmiar: ${product.size}</li>
    <li class=product__collection>Kolekcja: ${product.collection}</li>
    <li class=product__marka>Marka: ${product.marka}</li>
    <li class=product__amount>Ilość w magazynie: ${product.amount}</li>
    </ul>`;
    let className = 'product';
    if (product.inCart) {
      className = 'product inCart';
    }
    super(parentNode, 'div', className, content);
    this.productButtonList = new ProductButtonList(this.node, product, state);
    this.addToCartButton = new AddToCartButton(this.node, state, product);
  }
}
