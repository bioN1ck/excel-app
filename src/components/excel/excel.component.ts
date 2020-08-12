import { DomListener } from '@core/dom-listener';
import { DomElement } from '@core/dom-element';
import { ComponentOptions, Args, Listener } from '@models/excel.model';
import { Emitter } from '@core/emitter';

export class ExcelComponent extends DomListener {
  static className: string;
  public name: string;
  public emitter: Emitter;
  private subscriptions: Listener[];

  constructor($root: DomElement, options: ComponentOptions = {} as ComponentOptions) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.prepare();
    this.subscriptions = [];
  }

  // Настраиваем компонент до init()
  prepare() {}

  // Возвращает шаблон компонента
  public toHTML(): string {
    return '';
  }

  public $next(event: string, ...args: Args): void {
    this.emitter.next(event, ...args);
  }

  public $on(event: string, fn: (...data: Args) => void): void {
    const unsubscribe = this.emitter.subscribe(event, fn);
    this.subscriptions.push(unsubscribe);
  }

  public init(): void {
    this.initDOMListeners();
  }

  // Удаляет компонент, чистит слушателей
  public destroy(): void {
    this.removeDOMListeners();
    this.subscriptions.forEach(unsubscribe => unsubscribe());
  }
}
