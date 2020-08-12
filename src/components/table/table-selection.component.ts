import { DomElement } from '@core/dom-element';
import { CellCoords } from '@models/excel.model';
import { matrix } from './table-helper.fns';

export class TableSelection {
  static className = 'selected';

  private group: DomElement[];
  public current: DomElement;

  constructor() {
    this.group = [];
    this.current = null;
  }

  public select($element: DomElement): void {
    this.clear();
    $element.focus().addClass(TableSelection.className);
    this.group.push($element);
    this.current = $element;
  }

  public selectGroup($group: DomElement[]): void {
    this.clear();
    this.group = $group || [];
    this.group.forEach($el => $el.addClass(TableSelection.className));
  }

  private clear(): void {
    this.group.forEach(el => el.removeClass(TableSelection.className));
    this.group = [];
  }

  public handleGroupSelect($startCell: DomElement, $root: DomElement): void {
    const startCell = $startCell.id(true) as CellCoords;
    const endCell = this.current.id(true) as CellCoords;
    const $cells = matrix(startCell, endCell).map(id => $root.find(`[data-id="${id}"]`));
    this.selectGroup($cells);
  }
}
