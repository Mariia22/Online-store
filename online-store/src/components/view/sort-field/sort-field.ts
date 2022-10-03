import { StoreState } from '../../controller/state';
import { NodeControl } from '../../../common/ts/classes/node';

export class SortField extends NodeControl {
  private elSelectNative: HTMLSelectElement;
  private elSelectCustom: HTMLDivElement;
  private elSelectCustomBox: HTMLDivElement;
  private elSelectCustomOpts: HTMLDivElement;
  private customOptsList: Element[];
  private optionsCount: number;
  private optionChecked: string;
  private optionHoveredIndex: number;

  constructor(parentNode: HTMLElement, private state: StoreState) {
    const content = `
  <select class="selectNative js-selectNative" aria-labelledby="jobLabel">
    <option value="sel" disabled="" selected="">Sortowanie</option>
    <option data-value="az">Nazwa od A do Z</option>
    <option data-value="za">Nazwa od Z do A</option>
    <option data-value="asc">Rok rosnąco</option>
    <option data-value="desc">Rok malejąco</option>
</select>
<div class="selectCustom js-selectCustom" aria-hidden="true">
  <div class="selectCustom-trigger">Sortowanie</div>
  <div class="selectCustom-options">
    <div class="selectCustom-option" data-value="az" data-name="Nazwa od A do Z">Nazwa od A do Z</div>
    <div class="selectCustom-option" data-value="za" data-name="Nazwa od Z do A">Nazwa od Z do A</div>
    <div class="selectCustom-option" data-value="asc" data-name="Rok rosnąco">Rok rosnąco</div>
    <div class="selectCustom-option" data-value="desc" data-name="Rok malejąco">Rok malejąco</div>
  </div>
</div>
</div>
</div>`;
    super(parentNode, 'div', 'sort', content);
    this.elSelectNative = document.getElementsByClassName('js-selectNative')[0] as HTMLSelectElement;
    this.elSelectCustom = document.getElementsByClassName('js-selectCustom')[0] as HTMLDivElement;
    this.elSelectCustomBox = this.elSelectCustom.children[0] as HTMLDivElement;
    this.elSelectCustomOpts = this.elSelectCustom.children[1] as HTMLDivElement;
    this.customOptsList = Array.from(this.elSelectCustomOpts.children);
    this.optionsCount = this.customOptsList.length;
    this.optionChecked = '';
    this.optionHoveredIndex = -1;
    if (state.sort) {
      const elRespectiveCustomOption = this.elSelectCustomOpts.querySelectorAll(
        `[data-value="${state.sort}"]`
      )[0] as HTMLElement;
      this.elSelectNative.value = state.sort;
      this.updateCustomSelectChecked(state.sort, elRespectiveCustomOption.textContent);
    }

    this.elSelectCustomBox.addEventListener('click', () => {
      const isClosed = !this.elSelectCustom.classList.contains('isActive');
      if (isClosed) {
        this.openSelectCustom();
      } else {
        this.closeSelectCustom();
      }
    });

    this.elSelectNative.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLSelectElement;
      const value: string | null = target.value;
      if (value) {
        const elRespectiveCustomOption = this.elSelectCustomOpts.querySelectorAll(
          `[data-name="${value}"]`
        )[0] as HTMLElement;
        this.updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
        const attr: string | null = elRespectiveCustomOption.getAttribute('data-value');
        if (attr) {
          this.sortList(attr);
        }
      }
    });

    this.customOptsList.forEach((elOption, index: number) => {
      elOption.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLSelectElement;
        if (target) {
          const value = target.getAttribute('data-value');
          if (value) {
            this.elSelectNative.value = value;
            this.updateCustomSelectChecked(value, target.textContent);
            this.closeSelectCustom();
            this.sortList(value);
          }
        }
      });

      elOption.addEventListener('mouseenter', () => {
        this.updateCustomSelectHovered(index);
      });
    });
  }

  private watchClickOutside = (event: Event): void => {
    const didClickedOutside = !this.elSelectCustom.contains(event.target as HTMLElement);
    if (didClickedOutside) {
      this.closeSelectCustom();
    }
  };

  private openSelectCustom(): void {
    this.elSelectCustom.classList.add('isActive');
    this.elSelectCustom.setAttribute('aria-hidden', false.toString());

    if (this.optionChecked) {
      const optionCheckedIndex = this.customOptsList.findIndex(
        (el) => el.getAttribute('data-value') === this.optionChecked
      );
      this.updateCustomSelectHovered(optionCheckedIndex);
    }
    document.addEventListener('click', () => {
      this.watchClickOutside;
    });
    document.addEventListener('keydown', () => {
      this.supportKeyboardNavigation;
    });
  }

  private closeSelectCustom(): void {
    this.elSelectCustom.classList.remove('isActive');
    this.elSelectCustom.setAttribute('aria-hidden', true.toString());

    this.updateCustomSelectHovered(-1);
    document.removeEventListener('click', () => this.watchClickOutside);
    document.removeEventListener('keydown', () => this.supportKeyboardNavigation);
  }

  private updateCustomSelectHovered(newIndex: number): void {
    const prevOption = this.elSelectCustomOpts.children[this.optionHoveredIndex];
    const option = this.elSelectCustomOpts.children[newIndex];

    if (prevOption) {
      prevOption.classList.remove('isHover');
    }
    if (option) {
      option.classList.add('isHover');
    }

    this.optionHoveredIndex = newIndex;
  }

  private updateCustomSelectChecked(value: string, text: string | null): void {
    const prevValue = this.optionChecked;

    const elPrevOption = this.elSelectCustomOpts.querySelector(`[data-value="${prevValue}"`);
    const elOption = this.elSelectCustomOpts.querySelector(`[data-value="${value}"`);

    if (elPrevOption) {
      elPrevOption.classList.remove('isActive');
    }

    if (elOption) {
      elOption.classList.add('isActive');
    }

    this.elSelectCustomBox.textContent = text;
    this.optionChecked = value;
  }

  private supportKeyboardNavigation = (event: KeyboardEvent): void => {
    if (event.keyCode === 40 && this.optionHoveredIndex < this.optionsCount - 1) {
      event.preventDefault();
      this.updateCustomSelectHovered(this.optionHoveredIndex + 1);
    }

    if (event.keyCode === 38 && this.optionHoveredIndex > 0) {
      event.preventDefault();
      this.updateCustomSelectHovered(this.optionHoveredIndex - 1);
    }

    if (event.keyCode === 13 || event.keyCode === 32) {
      event.preventDefault();

      const option = this.elSelectCustomOpts.children[this.optionHoveredIndex] as HTMLDivElement;
      const value = option && option.getAttribute('data-value');

      if (value) {
        this.elSelectNative.value = value;
        this.updateCustomSelectChecked(value, option.textContent);
      }
      this.closeSelectCustom();
    }
    if (event.keyCode === 27) {
      this.closeSelectCustom();
    }
  };

  private sortList(value: string): void {
    this.state.changeState({ sort: value });
  }
}
