import { StoreState } from '../../../controller/state';
import { ResetFiltersButton } from '../reset-filters-button/reset-filters-button';
import { ResetLSButton } from '../reset-local-storage-button/reset-local-storage-button';
import { NodeControl } from '../../../../common/ts/classes/node';

export class ButtonsList extends NodeControl {
  private resetFiltersButton: ResetFiltersButton;
  private resetLSButton: ResetLSButton;

  constructor(parentNode: HTMLElement, state: StoreState) {
    super(parentNode, 'div', 'button__list');
    this.resetFiltersButton = new ResetFiltersButton(this.node, state);
    this.resetLSButton = new ResetLSButton(this.node, state);
  }
}
