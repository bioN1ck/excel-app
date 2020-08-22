import { BasePage } from '@core/base.page';
import { Excel } from '@core/excel';
import { DomElement } from '@core/dom-element';
import { storage, debounce } from '@core/utils';

import { FormulaComponent } from '@components/formula/formula.component';
import { HeaderComponent } from '@components/header/header.component';
import { TableComponent } from '@components/table/table.component';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';

import { rootReducer } from '@store/root-reducer';
import { Store } from '@store/store';

import { State } from '@models/store.model';
import { normalizeInitialState } from '@store/initial-state';

const storageName = (param: string) => `excel:${param}`;


export class ExcelPage extends BasePage {

  excel: Excel;

  public getRoot(): DomElement {
    const param = this.param || Date.now().toString();

    const tableState = storage(storageName(param));
    const store = new Store(rootReducer, normalizeInitialState(tableState));

    const stateListener = debounce((state: State) => {
      storage(storageName(param), state);
    }, 500);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [
        HeaderComponent,
        ToolbarComponent,
        FormulaComponent,
        TableComponent,
      ],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
