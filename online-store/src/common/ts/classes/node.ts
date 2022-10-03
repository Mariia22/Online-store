export class NodeControl {
  public node: HTMLElement;
  constructor(parentNode: HTMLElement | null, tagName = 'div', className?: string, content = '') {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    element.innerHTML = content;
    if (parentNode) {
      parentNode.append(element);
    }
    this.node = element;
  }
}
