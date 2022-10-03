import { StoreState } from '../../controller/state';

export class FilterCheckbox {
  private element: HTMLInputElement;

  constructor(parentNode: HTMLElement, filter: string | number, private state: StoreState) {
    this.element = document.createElement('input');
    this.element.type = 'checkbox';
    this.element.id = 'popular';
    this.element.value = '';
    let className = `popular`;
    if (state.popular === true) {
      className = `popular active`;
      this.element.checked = true;
    }
    this.element.className = className;
    parentNode.append(this.element);
    this.element.setAttribute('data-filter', filter.toString());
    this.element.onclick = () => {
      this.toggleClassAndFilter();
    };
  }

  private toggleClassAndFilter(): void {
    if (this.element.classList.contains('active')) {
      this.element.classList.remove('active');
      this.state.changeState({ popular: false });
    } else {
      this.element.classList.add('active');
      this.state.changeState({ popular: true });
    }
  }
}
