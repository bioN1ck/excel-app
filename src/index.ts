import { Router } from '@core/routes/router';
import { DashboardPage } from '@pages/dashboard.page';
import { ExcelPage } from '@pages/excel.page';
import './scss/index.scss';


const App = new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
