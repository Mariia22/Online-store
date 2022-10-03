import { FilterButton } from '../../filter-button/filter-button';
import { StoreState } from '../../../controller/state';
import { getFilters } from '../../../../common/ts/functions/array-functions';
import { NodeControl } from '../../../../common/ts/classes/node';

export class FilterColor extends NodeControl {
  constructor(parentNode: HTMLElement, state: StoreState) {
    const content = `<h3 class='filter__head'> Kolor:</h3>`;
    super(parentNode, 'div', 'filter__color', content);
    getFilters(state.copyProducts, 'color').forEach((color) => {
      let className = `filter__button color ${color.toLowerCase()}`;
      if (Object.keys(state.activeFilters).includes('color') && state.activeFilters['color'].includes(color)) {
        className = `filter__button color ${color.toLowerCase()} active pressed`;
      }
      new FilterButton(this.node, className, color, 'color', state);
    });
    document.querySelectorAll('.color').forEach((button) => (button.textContent = ''));
  }
}
