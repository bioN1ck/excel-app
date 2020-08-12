import { ExcelComponent } from '@components/excel/excel.component';
import { DomElement } from '@core/dom-element';
import { ComponentOptions } from '@models/excel.model';

export class ToolbarComponent extends ExcelComponent {

  static className = 'excel__toolbar';

  constructor($root: DomElement, options: ComponentOptions) {
    super($root, {
      name: 'Toolbar',
      ...options,
    });
  }

  public toHTML(): string {
    return `
      <div class="button">
        <i class="material-icons">format_align_left</i>
      </div>
      <div class="button">
        <i class="material-icons">format_align_center</i>
      </div>
      <div class="button">
        <i class="material-icons">format_align_right</i>
      </div>
      <div class="button">
        <i class="material-icons">format_bold</i>
      </div>
      <div class="button">
        <i class="material-icons">format_italic</i>
      </div>
      <div class="button">
        <i class="material-icons">format_underline</i>
      </div>
    `;
  }

}
