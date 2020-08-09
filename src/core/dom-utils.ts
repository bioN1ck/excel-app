export class DomElement {

  public nativeElement: HTMLElement;

  constructor(selector: string | HTMLElement) {
    this.nativeElement = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  public html(html: string): DomElement | string {
    if (typeof html === 'string') {
      this.nativeElement.innerHTML = html;
      return this;
    }
    return this.nativeElement.outerHTML.trim();
  }

  public clear(): DomElement {
    this.html('');
    return this;
  }

  public on(eventType: string, callback: () => void) {
    this.nativeElement.addEventListener(eventType, callback);
  }

  public off(eventType: string, callback: () => void) {
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

  public findAll(selector: string): NodeList {
    return this.nativeElement.querySelectorAll(selector);
  }

  public css(styles: Partial<CSSStyleDeclaration>): void {
    Object.keys(styles).forEach(style => {
      this.nativeElement.style[style] = styles[style];
    });
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

