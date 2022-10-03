import { ChangeState } from './../../common/ts/types/state.type';
import { Signal } from './../../common/ts/classes/signal';
import { InitData } from '../../common/ts/interfaces/init-data.interface';
import { DataFromServer } from './../../common/ts/interfaces/state.interface';
import { CartItem } from '../../common/ts/interfaces/cart-item.interface';
import { Product, ProductFromServer } from './../../common/ts/interfaces/product.interface';
import { State } from '../../common/ts/interfaces/state.interface';
import { getComparator, filterRange } from '../../common/ts/functions/array-functions';
import { defaultLocalStorage } from '../../common/ts/const/consts.const';

export class StoreState {
  private _products: Product[] = [];
  private _sort: string | null;
  private _activeFilters: Record<string, string[]>;
  private _activeRangeFilters: Record<string, string[]>;
  private _popular: boolean;
  private _search: string;
  private _cart: CartItem[] = [];
  private _copyProducts: Product[] = [];

  constructor() {
    const initData: InitData = this.getLocalStorageState() ?? defaultLocalStorage;
    this._sort = initData.sort;
    this._activeFilters = initData.activeFilters;
    this._activeRangeFilters = initData.activeRangeFilters;
    this._popular = initData.popular;
    this._search = initData.search;
    this._cart = initData.cart;
  }

  get products() {
    return this._products;
  }

  get copyProducts() {
    return this._copyProducts;
  }

  get sort() {
    return this._sort;
  }

  get activeFilters() {
    return this._activeFilters;
  }

  get activeRangeFilters() {
    return this._activeRangeFilters;
  }

  get popular() {
    return this._popular;
  }

  get search() {
    return this._search;
  }

  get cart() {
    return this._cart;
  }

  public onChange = new Signal<State>();

  public getLocalStorageState(): InitData | null {
    const loadedState = localStorage.getItem('savedState');
    if (loadedState) {
      return JSON.parse(loadedState) as InitData;
    }
    return null;
  }

  public saveToLocalStorage() {
    localStorage.setItem('savedState', JSON.stringify(this.getDataSet()));
  }

  filterProducts() {
    let products: Product[] = [...this._copyProducts];
    if (this.popular === true) {
      products = products.filter((product: Product) => product.popular === true);
    }

    if (this.sort) {
      if (this.sort === 'az') {
        products = products.sort(getComparator('name'));
      } else if (this.sort === 'za') {
        products = products.sort(getComparator('name')).reverse();
      } else if (this.sort === 'asc') {
        products = products.sort(getComparator('collection'));
      } else if (this.sort === 'desc') {
        products = products.sort(getComparator('collection')).reverse();
      }
    }

    if (Object.keys(this.activeFilters).length !== 0) {
      const filtersArr: [string, string[]][] = Object.entries(this.activeFilters).filter((item) => item[1].length > 0);
      products = products.filter((item: Product) => {
        return filtersArr.every(([field, values]) => {
          return values.includes(item[field as keyof Product].toString());
        });
      });
    }

    if (Object.keys(this.activeRangeFilters).length !== 0) {
      Object.entries(this.activeRangeFilters).forEach(([field, values]) => {
        products = filterRange(products, field as keyof Product, Number(values[0]), Number(values[1]));
      });
    }

    if (this.search.length > 0) {
      products = products.filter((product) => product.name.toLowerCase().includes(this.search.trim().toLowerCase()));
    }

    return products;
  }

  private getDataSet(): State {
    return {
      products: this.products,
      sort: this.sort,
      activeFilters: this.activeFilters,
      activeRangeFilters: this.activeRangeFilters,
      popular: this.popular,
      search: this.search,
      cart: this.cart,
    };
  }

  getProductsList(data: DataFromServer) {
    for (const field in data) {
      if (field === 'products') {
        this._products = data.products.map((product: ProductFromServer) => {
          return this.extendTypeProduct(product);
        });
        this._copyProducts = this._products;
      }
    }
    this.setStateFromLocalStorage();
  }

  private extendTypeProduct(product: ProductFromServer): Product {
    const base = product;
    const addition = { inCart: false };
    return { ...base, ...addition };
  }

  private setStateFromLocalStorage() {
    this.changeProductsState(this.filterProducts());
    this.checkProductsInCart();
  }

  private changeProductsState(products: Product[]) {
    this._products = products;
  }

  private changeSearchState(search = '') {
    this._search = search;
  }

  private changeSortState(sort: string | null) {
    this._sort = sort;
  }

  private changePopularFilterState(popular: boolean) {
    this._popular = popular;
  }

  private changeActiveFilterState(activeFilters: Record<string, string[]>) {
    this._activeFilters = activeFilters;
  }

  private changeActiveRangeFilterState(activeRangeFilters: Record<string, string[]>) {
    this._activeRangeFilters = activeRangeFilters;
  }

  private changeCart(cart: CartItem[]) {
    this._cart = cart;
    this.checkProductsInCart();
  }

  private checkProductsInCart() {
    const changedProducts = this.products.map((product) => {
      if (this.cart.some((item) => item.name === product.name)) {
        return { ...product, inCart: true };
      }
      return { ...product, inCart: false };
    });
    this.changeProductsState(changedProducts);
  }

  public changeState(data: ChangeState) {
    for (const field in data) {
      if (field === 'products') {
        if (data.products) {
          this.changeProductsState(data.products);
        } else {
          throw new Error('Products are not downloaded to state');
        }
      } else if (field === 'search') {
        this.changeSearchState(data.search);
        this.changeProductsState(this.filterProducts());
      } else if (field === 'sort') {
        this.changeSortState(data.sort ?? null);
        this.changeProductsState(this.filterProducts());
      } else if (field === 'popular') {
        this.changePopularFilterState(data.popular as boolean);
        this.changeProductsState(this.filterProducts());
      } else if (field === 'activeFilters') {
        if (data.activeFilters) {
          this.changeActiveFilterState(data.activeFilters);
          this.changeProductsState(this.filterProducts());
        }
      } else if (field === 'activeRangeFilters') {
        if (data.activeRangeFilters) {
          this.changeActiveRangeFilterState(data.activeRangeFilters);
          this.changeProductsState(this.filterProducts());
        }
      } else if (field === 'cart') {
        if (data.cart) {
          this.changeCart(data.cart);
        } else {
          throw new Error('Cart is not downloaded to state');
        }
      }
      this.onChange.emit(this.getDataSet());
    }
  }
}
