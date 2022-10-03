import { State } from './state.interface';

export type InitData = Pick<State, 'sort' | 'activeFilters' | 'activeRangeFilters' | 'popular' | 'search' | 'cart'>;
