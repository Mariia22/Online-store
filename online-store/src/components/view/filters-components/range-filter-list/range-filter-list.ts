import { RangeFilterNumberSlider } from '../range-filter-number/range-filter-number';
import { StoreState } from '../../../controller/state';
import { NodeControl } from '../../../../common/ts/classes/node';
import { RangeFilterYearSlider } from '../range-filter-year/range-filter-year';

export class RangeFilterList extends NodeControl {
  private rangeFilterNumberSlider: RangeFilterNumberSlider;
  private rangeFilterYearSlider: RangeFilterYearSlider;

  constructor(parentNode: HTMLElement, state: StoreState) {
    const content = `
    <p>Ilość w magazynie</p>
    <div id='filter__number__start'>1</div>
    <div id='slider__number' class='filter__number'></div>
    <div id='filter__number__end'>103</div>
    </div>
    <div>
    <p>Collection(rok)</p>
    <div id='filter__year__start'>2020</div>
    <div id='slider__year' class='filter__year'></div>
    <div id='filter__year__end'>2022</div>
    `;
    super(parentNode, 'div', 'filter__range', content);
    this.rangeFilterNumberSlider = new RangeFilterNumberSlider(state, [1, 103]);
    this.rangeFilterYearSlider = new RangeFilterYearSlider(state, [2020, 2022]);
  }
}
