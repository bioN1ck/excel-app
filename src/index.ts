import { Excel } from '@core/excel';
import { storage, debounce } from '@core/utils';

import { FormulaComponent } from '@components/formula/formula.component';
import { HeaderComponent } from '@components/header/header.component';
import { TableComponent } from '@components/table/table.component';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';

import { rootReducer } from '@store/root-reducer';
import { initialState } from '@store/initial-state';
import { Store } from '@store/store';

import './scss/index.scss';
import { State } from '@models/store.model';


const store = new Store(rootReducer, initialState);

const stateListener = debounce((state: State) => {
  storage('excel-state', state);
}, 500);

store.subscribe(stateListener);


const excel = new Excel('#app', {
  components: [
    HeaderComponent,
    ToolbarComponent,
    FormulaComponent,
    TableComponent,
  ],
  store,
});

excel.render();
