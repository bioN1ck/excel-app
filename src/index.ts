import { FormulaComponent } from '@components/formula/formula.component';
import { HeaderComponent } from '@components/header/header.component';
import { TableComponent } from '@components/table/table.component';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';
import { Excel } from './core/excel';
import './scss/index.scss';


const excel = new Excel('#app', {
  components: [
    HeaderComponent,
    ToolbarComponent,
    FormulaComponent,
    TableComponent,
  ],
});

excel.render();
