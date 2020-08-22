import { $ } from '@core/dom-element';
import { ExcelComponent } from '@components/excel/excel.component';
import { DomElement } from '@core/dom-element';
import { ComponentOptions, EventKey } from '@models/excel.model';
import * as action from '@store/actions';
import { ActiveRoute } from '@core/routes/active-route';

export class HeaderComponent extends ExcelComponent {
  static className = 'excel__header';

  constructor($root: DomElement, options: ComponentOptions) {
    super($root, {
      name: 'Header',
      listeners: [EventKey.INPUT, EventKey.CLICK],
      ...options,
    });
  }

  public toHTML(): string {
    const title = this.store.getState().title || 'Default table';
    return `
      <input type="text" class="input" value="${title}">
      <div>
        <div class="button" data-btn="remove">
          <i class="material-icons" data-btn="remove">delete</i>
        </div>
        <div class="button" data-btn="exit">
          <i class="material-icons" data-btn="exit">exit_to_app</i>
        </div>
      </div>
    `;
  }

  public onClick({target}: MouseEvent): void {
    const $target = $(target as HTMLElement);
    const data = $target.data.btn;

    if (data === 'remove') {
      const decision = confirm('Are you sure to delete this table?');
      if (decision) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`);
        ActiveRoute.navigate('');
      }
    } else if (data === 'exit') {
      ActiveRoute.navigate('');
    }
  }

  public onInput({target}: InputEvent): void {
    const $target = $(target as HTMLElement);
    this.$dispatch(action.changeTitle({
      value: $target.text() as string,
    }));
  }
}
