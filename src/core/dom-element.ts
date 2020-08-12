import { CellCoords } from '@models/excel.model';

export class DomElement {

  private nativeElement: HTMLElement;

  constructor(selector: string | HTMLElement) {
    this.nativeElement = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  public html(html: string): DomElement|string {
    if (typeof html === 'string') {
      this.nativeElement.innerHTML = html;
      return this;
    }
    return this.nativeElement.outerHTML.trim();
  }

  public text(message?: string): DomElement|string {
    if (typeof message === 'string') {
      this.nativeElement.textContent = message;
      return this;
    }
    if (this.nativeElement.tagName.toLowerCase() === 'input') {
      return (this.nativeElement as HTMLInputElement).value.trim();
    }
    return this.nativeElement.textContent.trim();
  }

  public clear(): DomElement {
    this.html('');
    return this;
  }

  // Вешаем слушателя на событие по имени
  public on(eventType: string, callback: () => void): void {
    this.nativeElement.addEventListener(eventType, callback);
  }

  // Дропаем событие по имени
  public off(eventType: string, callback: () => void): void {
    this.nativeElement.removeEventListener(eventType, callback);
  }

  public append(node: HTMLElement | DomElement): DomElement {
    if (node instanceof DomElement) {
      node = node.nativeElement;
    }

    if (Element.prototype.append) {
      this.nativeElement.append(node);
    } else {
      this.nativeElement.appendChild(node);
    }

    return this;
  }

  public closest(selector: string): DomElement {
    return $(this.nativeElement.closest(selector) as HTMLElement);
  }

  public getCoords(): DOMRect {
    return this.nativeElement.getBoundingClientRect();
  }

  public get data(): DOMStringMap {
    return this.nativeElement.dataset;
  }

  public find(selector: string): DomElement {
    return $(this.nativeElement.querySelector(selector) as HTMLDivElement);
  }

  public findAll(selector: string): NodeList {
    return this.nativeElement.querySelectorAll(selector);
  }

  public css(styles: Partial<CSSStyleDeclaration>): DomElement {
    Object.keys(styles).forEach(style => {
      this.nativeElement.style[style] = styles[style];
    });
    return this;
  }

  public addClass(className: string): DomElement {
    this.nativeElement.classList.add(className);
    return this;
  }

  public removeClass(className: string): DomElement {
    this.nativeElement.classList.remove(className);
    return this;
  }

  public id(parse?: boolean): string | CellCoords {
    if (parse) {
      const parsed = (this.id() as string).split(':');
      return { row: +parsed[0], col: +parsed[1] };
    }
    return this.data.id;
  }

  public focus(): DomElement {
    this.nativeElement.focus();
    return this;
  }

}


export function $(selector: string | HTMLElement): DomElement {
  return new DomElement(selector);
}


$.create = (tagName: string, classes = ''): DomElement => {
  const nativeElement: HTMLElement = document.createElement(tagName);
  if (classes) {
    nativeElement.classList.add(classes);
  }
  return $(nativeElement);
};

