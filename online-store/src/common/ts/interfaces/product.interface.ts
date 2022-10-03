export interface ProductFromServer {
  id: string;
  name: string;
  img: string;
  amount: number;
  color: string;
  price: number;
  size: number;
  collection: number;
  description: string;
  marka: string;
  popular: boolean;
}

export interface Product extends ProductFromServer {
  inCart: boolean;
}
