import { Product } from '../../../common/ts/interfaces/product.interface';
import { StoreState } from '../../controller/state';
import { NodeControl } from '../../../common/ts/classes/node';

export class FilterButton extends NodeControl {
  private field: keyof Product;
  static content: Record<string, string[]>;
  constructor(
    parentNode: HTMLElement,
    classButton: string,
    private data: string,
    filter: string | number,
    private state: StoreState
  ) {
    super(parentNode, 'button', classButton, data.toString());
    this.node.setAttribute('data-filter', filter.toString());
    this.field = this.node.getAttribute('data-filter') as keyof Product;
    this.node.onclick = () => {
      this.toggleClassAndFilter(this.field, this.data.toString());
    };
  }

  private toggleClassAndFilter(field: keyof Product, data: string) {
    if (this.node.classList.contains('active')) {
      this.node.classList.remove('active');
      this.removeActiveFilters(field, data);
      if (this.node.classList.contains('pressed')) {
        this.node.classList.remove('pressed');
      }
    } else {
      this.node.classList.add('active');
      if (this.node.classList.contains('color')) {
        this.node.classList.add('pressed');
      }
      this.addActiveFilters(field, data);
    }
  }

  private addActiveFilters(field: keyof Product, data: string) {
    const activeFilters = this.state.activeFilters;
    if (Object.keys(activeFilters).includes(field)) {
      this.state.changeState({
        activeFilters: {
          ...this.state.activeFilters,
          [field]: [...activeFilters[field], data],
        },
      });
    } else {
      this.state.changeState({ activeFilters: { ...this.state.activeFilters, [field]: [data] } });
    }
  }

  private removeActiveFilters(field: keyof Product, data: string) {
    const activeFilters = { ...this.state.activeFilters };
    const arrayFilters: string[] = activeFilters[field];
    const filter: string[] = arrayFilters.filter((item) => item !== data);
    this.state.changeState({ activeFilters: { ...this.state.activeFilters, [field]: [...filter] } });
  }
}
