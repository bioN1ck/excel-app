import { ExcelComponent } from '@components/excel/excel.component';
import { $, DomElement } from './dom-utils';

export class Excel {
  $el: DomElement;
  components: typeof ExcelComponent[];
  instances: ExcelComponent[];

  constructor(selector: string, options: { components: typeof ExcelComponent[] }) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot(): DomElement {
    const $root = $.create('div', 'excel');

    this.instances = this.components.map((Component: typeof ExcelComponent) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      // // DEBUG
      // if (component.name) {
      //   window['c' + component.name] = component;
      // }
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  render()   {
    this.$el.append(this.getRoot());
    this.instances.forEach((component: ExcelComponent) => component.init());
  }
}
