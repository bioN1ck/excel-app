import { ExcelComponent } from '@components/excel/excel.component';
import { createTable } from './table.template';
import { DomElement } from '@core/dom-utils';
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.helper';


export class TableComponent extends ExcelComponent {
  static className = 'excel__table';

  constructor($root: DomElement) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  public toHTML(): string {
    return createTable();
  }

  public onMousedown({target}: MouseEvent): void {
    const element = target as HTMLDivElement;
    if (shouldResize(element)) {
      resizeHandler(this.$root, element);
    }
  }
}
