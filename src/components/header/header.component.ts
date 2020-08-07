import { ExcelComponent } from '@components/excel/excel.component';

export class HeaderComponent extends ExcelComponent {
  static className = 'excel__header';

  toHTML(): string {
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
