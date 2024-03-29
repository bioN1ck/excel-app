import { $ } from '@core/dom-element';
import { ExcelComponent } from '@components/excel/excel.component';
import { DomElement } from '@core/dom-element';
import { ComponentOptions, EventKey } from '@models/excel.model';
import { StateKey } from '@models/store.model';

export class FormulaComponent extends ExcelComponent {
  static className = 'excel__formula';
  private $formula: DomElement;

  constructor($root: DomElement, options: ComponentOptions) {
    super($root, {
      name: 'Formula',
      listeners: [EventKey.INPUT, EventKey.KEYDOWN],
      subscribe: [StateKey.CURRENT_TEXT],
      ...options,
    });
  }

  public toHTML(): string {
    return `
      <div class="info">fx</div>
      <div
        id="formula"
        class="input"
        contenteditable
        spellcheck="false"
      ></div>
    `;
  }

  public init(): void {
    super.init();

    this.$formula = this.$root.find('#formula');

    this.$on('table:select', ($cell: DomElement) => {
      this.$formula.text($cell.data.value);
    });
  }

  public storeChanged({currentText}: {[StateKey.CURRENT_TEXT]: string}): void {
    this.$formula.text(currentText);
  }

  public onInput({target}: InputEvent): void {
    const text = $(target as HTMLDivElement).text() as string;
    this.$next('formula:input', text);
  }

  public onKeydown(event: KeyboardEvent): void {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$next('formula:done');
    }
  }

}
