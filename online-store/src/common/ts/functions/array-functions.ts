import { Product } from '../interfaces/product.interface';

export function getFilters(products: Product[], field: keyof Product): string[] {
  return products
    .reduce((acc: string[], product: Product) => {
      return acc.indexOf(product[field].toString()) !== -1 ? acc : [...acc, product[field].toString()];
    }, [])
    .sort();
}

export function getComparator(field: keyof Product) {
  return (a: Product, b: Product) => (a[field] > b[field] ? 1 : -1);
}

export function filterRange(products: Product[], field: keyof Product, a: number, b: number): Product[] {
  return products.filter((item) => a <= item[field] && item[field] <= b);
}
