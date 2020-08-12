import { ExcelComponent } from '@components/excel/excel.component';
import { $, DomElement } from './dom-element';
import { Emitter } from './emitter';
import { ComponentOptions } from '@models/excel.model';

export class Excel {
  $excel: DomElement;
  private components: typeof ExcelComponent[];
  private instances: ExcelComponent[];
  private emitter: Emitter;

  constructor(selector: string, options: { components: typeof ExcelComponent[] }) {
    this.$excel = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot(): DomElement {
    const $root = $.create('div', 'excel');
    const options: ComponentOptions = {
      emitter: this.emitter,
    };

    this.instances = this.components.map((Component: typeof ExcelComponent) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, options);

      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  public render(): void {
    this.$excel.append(this.getRoot());
    this.instances.forEach((component: ExcelComponent) => component.init());
  }

  public destroy(): void {
    this.instances.forEach(component => component.destroy());
  }
}
