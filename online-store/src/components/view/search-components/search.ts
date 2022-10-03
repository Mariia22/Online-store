import { StoreState } from '../../controller/state';

export class Search {
  private element: HTMLInputElement;

  constructor(parentNode: HTMLElement, private state: StoreState) {
    this.element = document.createElement('input');
    this.element.placeholder = 'Szukaj...';
    this.element.type = 'search';
    if (state.search.length > 0) {
      this.element.value = state.search;
    } else {
      this.element.value = '';
    }

    this.element.className = 'search';
    this.element.autofocus = true;
    parentNode.append(this.element);
    this.element.addEventListener('input', () => {
      this.input();
    });
  }

  input(): void {
    this.state.changeState({ search: this.element.value });
  }
}
