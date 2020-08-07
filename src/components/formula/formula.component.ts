import { ExcelComponent } from '@components/excel/excel.component';
import { DomElement } from '@core/dom-utils';

export class FormulaComponent extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root: DomElement) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  toHTML(): string {
    return `
      <div class="info">fx</div>
      <div
        class="input"
        contenteditable
        spellcheck="false"
      ></div>
    `;
  }

  onInput(event: InputEvent) {
    console.log(this.$root);
    console.log('Formula: onInput: ', (event.target as HTMLDivElement).innerText);
  }

  onClick(event: MouseEvent) {
    console.log('Formula: onCLick: ', event);
  }
}
