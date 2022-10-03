import { TEXT } from './../../../../common/ts/const/consts.const';
import { StoreState } from '../../../controller/state';
import { NodeControl } from '../../../../common/ts/classes/node';
import { defaultLocalStorage } from '../../../../common/ts/const/consts.const';

export class ResetLSButton extends NodeControl {
  constructor(parentNode: HTMLElement, private state: StoreState) {
    super(parentNode, 'button', 'filter__button button__reset__LS');
    this.node.textContent = TEXT.INTERFACE.RESET_LOCAL_STORAGE;
    this.node.onclick = () => {
      this.reset();
    };
  }
  private reset() {
    localStorage.clear();
    this.state.changeState(defaultLocalStorage);
    location.reload();
  }
}
