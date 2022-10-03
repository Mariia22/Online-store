import { InitData } from '../interfaces/init-data.interface';

export const NUMBER_OF_SLOTS = 20;

export const defaultLocalStorage: InitData = {
  sort: null,
  activeFilters: {},
  activeRangeFilters: {},
  popular: false,
  search: '',
  cart: [],
};

export const TEXT = {
  INTERFACE: {
    RESET_BUTTON: 'Usuń z koszyka',
    RESET_FILTER: 'Zresetuj filtr',
    RESET_LOCAL_STORAGE: 'Zresetuj ustawenia',
  },
  MESSAGE: {
    NOT_ENOUGH_PRODUCT_ERROR: 'Przedmiot niedostępny w tej ilości',
    OVERFLOW_BASKET_ERROR: 'Wszystkie sloty są zajęte',
    NOT_FOUND_PRODUCT_MESSAGE: 'Produkt nie znaleziony',
  },
} as const;
