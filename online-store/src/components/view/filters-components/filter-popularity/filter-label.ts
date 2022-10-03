export class FilterCheckboxLabel {
  private element: HTMLLabelElement;
  constructor(parentNode: HTMLElement) {
    this.element = document.createElement('label');
    this.element.className = 'filter__popular__label';
    this.element.setAttribute('for', 'popular');
    parentNode.append(this.element);
  }
}
