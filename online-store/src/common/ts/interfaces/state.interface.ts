import { CartItem } from './cart-item.interface';
import { Product, ProductFromServer } from './product.interface';

export interface State {
  products: Product[];
  sort: string | null;
  activeFilters: Record<string, string[]>;
  activeRangeFilters: Record<string, string[]>;
  popular: boolean;
  search: string;
  cart: CartItem[];
}

export interface DataFromServer {
  products: ProductFromServer[];
}
