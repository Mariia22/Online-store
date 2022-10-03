import { NodeControl } from '../../../../common/ts/classes/node';
import { StoreState } from '../../../controller/state';
import { FilterSize } from '../filter-size/filter-size';
import { FilterProducer } from '../filter-producer/filter-producer';
import { FilterColor } from '../filter-color/filter-color';
import { FilterPopular } from '../filter-popularity/filter-popularity';

export class FilterList extends NodeControl {
  private filterProducer: FilterProducer;
  private filterColor: FilterColor;
  private filterSize: FilterSize;
  private filterPopular: FilterPopular;

  constructor(parentNode: HTMLElement, state: StoreState) {
    const content = `<h2>Filters</h2>`;
    super(parentNode, 'div', 'filter', content);
    this.filterProducer = new FilterProducer(this.node, state);
    this.filterColor = new FilterColor(this.node, state);
    this.filterSize = new FilterSize(this.node, state);
    this.filterPopular = new FilterPopular(this.node, state);
  }
}
