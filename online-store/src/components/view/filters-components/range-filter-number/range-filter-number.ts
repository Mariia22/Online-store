import { StoreState } from '../../../controller/state';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export class RangeFilterNumberSlider {
  constructor(state: StoreState, initValue: number[]) {
    const rangeNumber = document.getElementById('slider__number') as noUiSlider.target;
    const numberFormat = {
      from: function (formattedValue: string) {
        return Number(formattedValue);
      },
      to: function (numericValue: number) {
        return Math.round(numericValue);
      },
    };

    noUiSlider.create(rangeNumber, {
      start: initValue,
      connect: false,
      range: {
        min: 1,
        max: 103,
      },
      step: 1,
      format: numberFormat,
      tooltips: {
        to: function (numericValue) {
          return numericValue.toFixed(0);
        },
      },
    });
    const slider = rangeNumber.noUiSlider as noUiSlider.API;
    if (state.activeRangeFilters.amount) {
      slider.set(state.activeRangeFilters.amount);
    } else {
      slider.set(['0', '103']);
    }
    const start = document.getElementById('filter__number__start') as HTMLElement;
    const end = document.getElementById('filter__number__end') as HTMLElement;
    const formatValues = [start, end];
    slider.on('set', function (values, handle) {
      formatValues[handle].innerHTML = String(values[handle]);
      if (start.textContent && end.textContent) {
        state.changeState({
          activeRangeFilters: { ...state.activeRangeFilters, amount: [start.textContent, end.textContent] },
        });
      } else {
        throw new Error('Choose number of goods');
      }
    });
  }
}
