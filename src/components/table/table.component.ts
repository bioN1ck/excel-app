import { $ } from '@core/dom-element';
import { DomElement } from '@core/dom-element';
import { ExcelComponent } from '@components/excel/excel.component';

import { createTable } from './table-template.fns';
import { resizeHandler } from './table-resize.fns';
import { shouldResize, shouldSelect, nextSelection } from './table-helper.fns';
import { TableSelection } from './table-selection.component';
import { CellCoords, ComponentOptions, EventKey } from '@models/excel.model';
import * as actions from '@store/actions';
import { ToolbarState } from '@models/store.model';
import { DEFAULT_STYLES } from '@constants';
import { parse } from '@core/utils';

export class TableComponent extends ExcelComponent {

  static className = 'excel__table';
  private selection: TableSelection;

  constructor($root: DomElement, options: ComponentOptions) {
    super($root, {
      name: 'Table',
      listeners: [EventKey.MOUSEDOWN, EventKey.KEYDOWN, EventKey.INPUT],
      ...options,
    });
  }

  public toHTML(): string {
    return createTable(20, this.store.getState());
  }

  public prepare(): void {
    this.selection = new TableSelection();
  }

  public init(): void {
    super.init();
    this.prepare();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    // Подписываемся на события инпута (компонент - формула)
    this.$on('formula:input', (value: string) => {
      (this.selection.current
        .attr('data-value', value) as DomElement)
        .text(parse(value));

      this.updateTextInStore(value);
    });

    // Подписка на нажатие Enter или Tab
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', (styles: ToolbarState) => {
      this.selection.applyStyle(styles);
      this.$dispatch(actions.applyStyle({
        ids: this.selection.selectedIds,
        styles,
      }));
    });
  }

  private selectCell($cell: DomElement): void {
    this.selection.select($cell);
    // this.updateTextInStore($cell.text() as string);
    this.$next('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(DEFAULT_STYLES));
    this.$dispatch(actions.changeStyles({styles}));
  }

  private async resizeTable(event: HTMLDivElement): Promise<void> {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('Resize error: ', e.message);
    }
  }

  public onMousedown(event: MouseEvent): void {
    const element = event.target as HTMLDivElement;
    if (shouldResize(element)) {
      // resizeHandler(this.$root, element);
      this.resizeTable(element);
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
        this.selectCell($cell);
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

  private updateTextInStore(value: string): void {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id() as string,
      value,
    }));
  }

  public onInput({target}: InputEvent): void {
    this.updateTextInStore($(target as HTMLDivElement).text() as string);
  }

  public destroy(): void {
    super.destroy();
  }

}
