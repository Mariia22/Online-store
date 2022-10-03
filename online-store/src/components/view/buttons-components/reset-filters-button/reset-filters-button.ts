import { TEXT } from './../../../../common/ts/const/consts.const';
import * as noUiSlider from 'nouislider';
import { StoreState } from '../../../controller/state';
import { NodeControl } from '../../../../common/ts/classes/node';

export class ResetFiltersButton extends NodeControl {
  constructor(parentNode: HTMLElement, private state: StoreState) {
    super(parentNode, 'button', 'filter__button button__reset__LS');
    this.node.textContent = TEXT.INTERFACE.RESET_FILTER;
    this.node.onclick = () => {
      this.resetFilter();
      this.resetFilterView();
    };
  }

  private resetFilter(): void {
    this.state.changeState({ activeFilters: {}, popular: false, activeRangeFilters: {} });
  }

  private resetFilterView(): void {
    const activeFilters: NodeList = document.querySelectorAll('.active');
    const checkboxFilters: NodeList = document.querySelectorAll("input[type='checkbox']");
    if (activeFilters.length > 0) {
      activeFilters.forEach((item) => {
        (<Element>item).classList.remove('active');
        (<Element>item).classList.remove('pressed');
      });
    }
    if (checkboxFilters.length > 0) {
      checkboxFilters.forEach((item) => ((<HTMLInputElement>item).checked = false));
    }
    const rangeNumber = document.getElementById('slider__number') as noUiSlider.target;
    const slider = rangeNumber.noUiSlider as noUiSlider.API;
    slider.set(['0', '103']);
    const rangeYear = document.getElementById('slider__year') as noUiSlider.target;
    const sliderYear = rangeYear.noUiSlider as noUiSlider.API;
    sliderYear.set(['2020', '2022']);
  }
}
