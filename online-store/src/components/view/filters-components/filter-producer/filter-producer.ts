import { FilterButton } from '../../filter-button/filter-button';
import { StoreState } from '../../../controller/state';
import { getFilters } from '../../../../common/ts/functions/array-functions';
import { NodeControl } from '../../../../common/ts/classes/node';

export class FilterProducer extends NodeControl {
  constructor(parentNode: HTMLElement, state: StoreState) {
    const content = `<h3 class='filter__head'>Producent:</h3>`;
    super(parentNode, 'div', 'filter__producer', content);
    getFilters(state.copyProducts, 'marka').forEach((marka) => {
      let className = `filter__button`;
      if (Object.keys(state.activeFilters).includes('marka') && state.activeFilters['marka'].includes(marka)) {
        className = `filter__button active`;
      }
      new FilterButton(this.node, className, marka, 'marka', state);
    });
  }
}
