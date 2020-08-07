import { ExcelComponent } from '@components/excel/excel.component';
import { DomElement } from '@core/dom-utils';

export class ToolbarComponent extends ExcelComponent {
  static className = 'excel__toolbar';

  constructor($root: DomElement) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
    });
  }

  toHTML(): string {
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

  onClick(event: MouseEvent) {
    console.log(event.target);
  }
}
