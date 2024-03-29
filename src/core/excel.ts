import { ExcelComponent } from '@components/excel/excel.component';
import { $, DomElement } from '@core/dom-element';
import { Emitter } from '@core/emitter';
import { ComponentOptions } from '@models/excel.model';
import { Store } from '@store/store';
import { StoreSubscriber } from '@store/store-subscriber';
import { updateDate } from '@store/actions';


interface InitOptions {
  components: typeof ExcelComponent[];
  store: Store;
}

export class Excel {

  private components: typeof ExcelComponent[];
  private instances: ExcelComponent[];
  private emitter: Emitter;
  private store: Store;
  private subscriber: StoreSubscriber;

  constructor(options: InitOptions) {
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot(): DomElement {
    const $root = $.create('div', 'excel');
    const options: ComponentOptions = {
      emitter: this.emitter,
      store: this.store,
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

  public init(): void {
    this.store.dispatch(updateDate());
    this.subscriber.subscribeComponents(this.instances);
    this.instances.forEach((component: ExcelComponent) => component.init());
  }

  public destroy(): void {
    this.subscriber.unsubscribeFromStore();
    this.instances.forEach(component => component.destroy());
  }
}
