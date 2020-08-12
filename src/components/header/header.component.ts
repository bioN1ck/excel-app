import { ExcelComponent } from '@components/excel/excel.component';
import { DomElement } from '@core/dom-element';
import { ComponentOptions } from '@models/excel.model';

export class HeaderComponent extends ExcelComponent {
  static className = 'excel__header';

  constructor($root: DomElement, options: ComponentOptions) {
    super($root, {
      name: 'Header',
      ...options,
    });
  }

  public toHTML(): string {
    return `
      <input type="text" class="input" value="New table">
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
}
