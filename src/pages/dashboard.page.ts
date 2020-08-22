import { $, DomElement } from '@core/dom-element';
import { BasePage } from '@core/base.page';
import { storage } from '@core/utils';

export class DashboardPage extends BasePage {

  constructor(params) {
    super(params);
  }

  public getRoot(): DomElement {
    const id = Date.now().toString();
    return $.create('div', 'db').html(`
      <div class="db__header">
        <h1>Typescript Excel</h1>
      </div>
      <div class="db__new">
        <div class="db__view">
          <a href="#excel/${id}" class="db__create">New<br> table</a>
        </div>
      </div>
      <div class="db__table db__view">
        ${this.createTaleList()}
      </div>
    `) as DomElement;
  }

  private toHTML(key: string): string {
    const state = storage(key);
    const title = state.title;
    const id = key.split(':')[1];

    const date = new Date(state.openedAt).toLocaleDateString();
    const time = new Date(state.openedAt).toLocaleTimeString();

    return `
      <li class="db__record">
        <a href="#excel/${id}">${title}</a>
        <strong>${date} ${time}</strong>
      </li>
    `;
  }

  private createTaleList(): string {
    const keys = this.getAllKeys();
    if (!keys.length) {
      return `No tables has been created yet`;
    }
    return `
      <div class="db__list-header">
        <span>Name</span>
        <span>Opened at</span>
      </div>

      <ul class="db__list">
        ${keys.map(this.toHTML).join('')}
      </ul>
    `;
  }

  private getAllKeys(): string[] {
    // const keys = [];
    // for (let i = 0; i < localStorage.length; i++) {
    //   const key = localStorage.key(i);
    //   if (!key.includes('excel')) {
    //     continue;
    //   }
    //   keys.push(key);
    // }
    // return keys;
    return Object
      .keys(localStorage)
      .filter(key => key.includes('excel'));
  }
}
