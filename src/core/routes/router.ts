import { $, DomElement } from '@core/dom-element';
import { IRoutes } from '@models/router.model';
import { ActiveRoute } from './active-route';
import { BasePage } from '@core/base.page';


export class Router {

  public $placeholder: DomElement;
  public routes: IRoutes;
  public page: BasePage;

  constructor(selector: string, routes: IRoutes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  public init(): void {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  public changePageHandler(): void {
    if (this.page) {
      this.page.destroy();
    }

    this.$placeholder.clear();

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard;

    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot() as DomElement);

    this.page.afterRender();
  }

  public destroy(): void {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
