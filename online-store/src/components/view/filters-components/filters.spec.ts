import { getFilters, filterRange, getComparator } from '../../../common/ts/functions/array-functions';

const products = [
  {
    id: '74089-L0-00',
    name: 'NEW BIANCA',
    img: './assets/img/newBianka.jpeg',
    amount: 45,
    color: 'Black',
    price: 399,
    size: 38,
    collection: 2020,
    description: 'Lakierowane klasyczne czółenka z dużym metalowym monogramem',
    marka: 'Kazar',
    popular: false,
    inCart: false,
  },
  {
    id: '69843-01-20',
    name: 'FELIZIA',
    img: './assets/img/felizia.jpeg',
    amount: 22,
    color: 'Olive',
    price: 359,
    size: 37,
    collection: 2021,
    description: 'Ciemnobeżowe klapki damskie z kwadratowym noskiem',
    marka: 'Kazar',
    popular: true,
    inCart: true,
  },
  {
    id: '63468-L0-N4',
    name: 'NEW NATALIE',
    img: './assets/img/newNatalie.jpeg',
    amount: 5,
    color: 'Red',
    price: 449,
    size: 40,
    collection: 2022,
    description: 'Czerwone lakierowane szpilki z noskami w szpic',
    marka: 'Kazar',
    popular: false,
    inCart: false,
  },
];
describe('Test filters functions', () => {
  it('it should choose all filter parametres', () => {
    const field = 'color';
    const output = ['Black', 'Olive', 'Red'];
    expect(getFilters(products, field)).toEqual(output);
  });

  describe('Filter range function', () => {
    it('it should range products according to the selected parameters(1 parametr)', () => {
      const field = 'collection';
      const output = [products[1]];
      expect(filterRange(products, field, 2021, 2021)).toEqual(output);
    });
    it('it should range products according to the selected parameters(2 parametres)', () => {
      const field = 'collection';
      const output = [products[0], products[1]];
      expect(filterRange(products, field, 2020, 2021)).toEqual(output);
    });
  });

  it('it should sort array according chosen field', () => {
    const field = 'name';
    const output = [products[1], products[0], products[2]];
    expect(products.sort(getComparator(field))).toEqual(output);
  });
});
