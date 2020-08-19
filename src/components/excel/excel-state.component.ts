import { ExcelComponent } from './excel.component';
import { DomElement } from '@core/dom-element';
import { ComponentOptions } from '@models/excel.model';
import { ToolbarState } from '@models/store.model';

export class ExcelStateComponent extends ExcelComponent {

  protected state: ToolbarState;

  constructor($root: DomElement, options: ComponentOptions) {
    super($root, options);
  }

  public get template(): string {
    return JSON.stringify(this.state, null, 2);
  }

  public initState(initialState: ToolbarState): void {
    this.state = {...initialState};
  }

  public setState(newState: ToolbarState): void {
    this.state = {...this.state, ...newState};
    this.$root.html(this.template);
  }

}
