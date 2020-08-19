import { $ } from '@core/dom-element';
import { DomElement } from '@core/dom-element';
import { ComponentOptions, EventKey } from '@models/excel.model';
import { createToolbar } from './toolbar-template';
import { ExcelStateComponent } from '@components/excel/excel-state.component';
import { DEFAULT_STYLES } from '@constants';
import { StateKey, State } from '@models/store.model';

export class ToolbarComponent extends ExcelStateComponent {

  static className = 'excel__toolbar';

  constructor($root: DomElement, options: ComponentOptions) {
    super($root, {
      name: 'Toolbar',
      listeners: [EventKey.CLICK],
      subscribe: [StateKey.CURRENT_STYLES],
      ...options,
    });
  }

  public prepare(): void {
    this.initState(DEFAULT_STYLES);
  }

  public get template(): string {
    return createToolbar(this.state);
  }

  public toHTML(): string {
    return this.template;
  }

  public storeChanged(changes: Partial<State>): void {
    this.setState(changes.currentStyles);
  }

  public onClick(event: MouseEvent): void {
    const $target = $(event.target as HTMLElement);
    $target.addClass('active');
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$next('toolbar:applyStyle', value);
    }
  }

}
