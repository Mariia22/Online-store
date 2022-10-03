import { Aside } from '../aside-components/aside';
import { StoreState } from '../../controller/state';
import { NodeControl } from '../../../common/ts/classes/node';

export class Page extends NodeControl {
  private aside: Aside;
  constructor(parentNode: HTMLElement, state: StoreState) {
    super(parentNode, 'main', 'container wrapper');
    this.aside = new Aside(this.node, state);
  }
}
