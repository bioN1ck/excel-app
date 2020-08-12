import { $ } from '@core/dom-element';
import { DomElement } from '@core/dom-element';
import { ExcelComponent } from '@components/excel/excel.component';

import { createTable } from './table-template.fns';
import { resizeHandler } from './table-resize.fns';
import { shouldResize, shouldSelect, nextSelection } from './table-helper.fns';
import { TableSelection } from './table-selection.component';
import { CellCoords, ComponentOptions } from '@models/excel.model';


export class TableComponent extends ExcelComponent {

  static className = 'excel__table';
  private selection: TableSelection;

  constructor($root: DomElement, options: ComponentOptions) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  public toHTML(): string {
    return createTable();
  }

  public prepare(): void {
    this.selection = new TableSelection();
  }

  public init(): void {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    // Подписываемся на события инпута (компонент - формула)
    this.$on('formula:input', (text: string) => {
      this.selection.current.text(text);
    });

    // Подписка на нажатие Enter или Tab
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  private selectCell($cell: DomElement): void {
    this.selection.select($cell);
    this.$next('table:input', $cell);
  }

  public onMousedown(event: MouseEvent): void {
    const element = event.target as HTMLDivElement;
    if (shouldResize(element)) {
      resizeHandler(this.$root, element);
    }
    if (shouldSelect(element)) {
      const $cell = $(element);
      if (event.shiftKey) {
        // const startCell = $cell.id(true) as CellCoords;
        // const endCell = this.selection.current.id(true) as CellCoords;
        // const $cells = matrix(startCell, endCell).map(id => this.$root.find(`[data-id="${id}"]`));
        // this.selection.selectGroup($cells);
        this.selection.handleGroupSelect($cell, this.$root);
      } else {
        this.selection.select($cell);
      }
    }
  }

  public onKeydown(event: KeyboardEvent): void {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault();
      const coords = this.selection.current.id(true) as CellCoords;
      const $nextCell = this.$root.find(nextSelection(event.key, coords));
      this.selectCell($nextCell);
    }
  }

  public onInput({target}: InputEvent): void {
    this.$next('table:input', $(target as HTMLDivElement));
  }

  public destroy(): void {
    super.destroy();
  }

}
