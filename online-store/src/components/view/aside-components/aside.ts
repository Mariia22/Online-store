import { ButtonsList } from './../buttons-components/buttons-list/buttons-list';
import { RangeFilterList } from './../filters-components/range-filter-list/range-filter-list';
import { StoreState } from '../../controller/state';
import { NodeControl } from '../../../common/ts/classes/node';
import { FilterList } from '../filters-components/filter-list/filter-list';
import { SortField } from '../sort-field/sort-field';

export class Aside extends NodeControl {
  private sortField: SortField;
  private filterList: FilterList;
  private rangeFilterList: RangeFilterList;
  private buttonsList: ButtonsList;

  constructor(parentNode: HTMLElement, state: StoreState) {
    super(parentNode, 'div', 'aside');
    this.sortField = new SortField(this.node, state);
    this.filterList = new FilterList(this.node, state);
    this.rangeFilterList = new RangeFilterList(this.node, state);
    this.buttonsList = new ButtonsList(this.node, state);
  }
}
