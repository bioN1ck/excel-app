import { DomElement } from './dom-element';

export class BasePage {
  public param: string;

  constructor(param?: string) {
    console.log('param: ', param);
    this.param = param;
  }

  getRoot(): DomElement|void {
    // throw new Error('Method "getRoot" should be implemented');
  }

  afterRender() {

  }

  destroy() {

  }
}
