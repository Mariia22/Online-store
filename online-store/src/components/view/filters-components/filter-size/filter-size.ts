import { FilterButton } from '../../filter-button/filter-button';
import { StoreState } from '../../../controller/state';
import { getFilters } from '../../../../common/ts/functions/array-functions';
import { NodeControl } from '../../../../common/ts/classes/node';

export class FilterSize extends NodeControl {
  constructor(parentNode: HTMLElement, state: StoreState) {
    const content = `<h3 class='filter__head'> Rozmiar:</h3>`;
    super(parentNode, 'div', 'filter__size', content);
    getFilters(state.copyProducts, 'size').forEach((size) => {
      let className = `filter__button`;
      if (Object.keys(state.activeFilters).includes('size') && state.activeFilters['size'].includes(size)) {
        className = `filter__button active`;
      }
      new FilterButton(this.node, className, size, 'size', state);
    });
  }
}
