import { $ } from '@core/dom-element';
import { ExcelComponent } from '@components/excel/excel.component';
import { DomElement } from '@core/dom-element';
import { ComponentOptions, EventKey } from '@models/excel.model';
import * as action from '@store/actions';

export class HeaderComponent extends ExcelComponent {
  static className = 'excel__header';

  constructor($root: DomElement, options: ComponentOptions) {
    super($root, {
      name: 'Header',
      listeners: [EventKey.INPUT],
      ...options,
    });
  }

  public toHTML(): string {
    const title = this.store.getState().title || 'Default table';
    return `
      <input type="text" class="input" value="${title}">
      <div>
        <div class="button">
          <i class="material-icons">delete</i>
        </div>
        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `;
  }

  public onInput({target}: InputEvent): void {
    const $target = $(target as HTMLElement);
    this.$dispatch(action.changeTitle({
      value: $target.text() as string,
    }));
  }
}
