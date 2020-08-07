import { DomListener } from '@core/dom-listener';
import { DomElement } from '@core/dom-utils';
import { CreateOptions } from '@models/excel.model';

export class ExcelComponent extends DomListener {
  static className: string;
  public name: string;

  constructor($root: DomElement, options: CreateOptions = {} as CreateOptions) {
    super($root, options.listeners);
    this.name = options.name || '';
  }

  // Возвращает шаблон компонента
  toHTML(): string {
    return '';
  }

  init(): void {
    this.initDOMListeners();
  }

  destroy(): void {
    this.removeDOMListeners();
  }
}
