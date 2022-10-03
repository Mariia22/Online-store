import { FilterCheckboxLabel } from './filter-label';
import { FilterCheckbox } from '../../filter-checkbox/filter-checkbox';
import { StoreState } from '../../../controller/state';
import { NodeControl } from '../../../../common/ts/classes/node';

export class FilterPopular extends NodeControl {
  private filterCheckbox: FilterCheckbox;
  private filterCheckboxLabel: FilterCheckboxLabel;

  constructor(parentNode: HTMLElement, state: StoreState) {
    const content = `<h3 class='filter__head'>Tylko popularne:</h3>`;
    super(parentNode, 'div', 'filter__popular', content);
    this.filterCheckbox = new FilterCheckbox(this.node, 'popular', state);
    this.filterCheckboxLabel = new FilterCheckboxLabel(this.node);
  }
}
