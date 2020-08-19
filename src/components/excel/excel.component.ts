import { DomListener } from '@core/dom-listener';
import { DomElement } from '@core/dom-element';
import { ComponentOptions, Args, Listener } from '@models/excel.model';
import { Action, StateKey, SubState, State } from '@models/store.model';
import { Emitter } from '@core/emitter';
import { Store } from '@store/store';


export class ExcelComponent extends DomListener {

  static className: string;
  public name: string;
  public emitter: Emitter;
  public store: Store;
  public subscribe: StateKey[];
  private subscriptions: Listener[];

  constructor(
    $root: DomElement,
    options: ComponentOptions = {} as ComponentOptions,
  ) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.subscriptions = [];

    this.prepare();
  }

  // Настраиваем компонент до init()
  public prepare(): void {}

  public init(): void {
    this.initDOMListeners();
  }

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

  public $dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  // Только изменения по подписанным полям
  public storeChanged(changes: Partial<State>): void {}

  public isWatching(key: StateKey): boolean {
    return this.subscribe.includes(key);
  }

  // Удаляет компонент, чистит слушателей
  public destroy(): void {
    this.removeDOMListeners();
    this.subscriptions.forEach(unsubscribe => unsubscribe());
  }
}
