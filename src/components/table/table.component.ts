import { ExcelComponent } from '@components/excel/excel.component';
import { createTable } from './table.template';

export class TableComponent extends ExcelComponent {
  static className = 'excel__table';

  toHTML(): string {
    return createTable();
  }
}
