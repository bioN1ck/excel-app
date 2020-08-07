import { DomElement } from './dom-utils';
import { capitalize } from '@utils';

export class DomListener {
  public $root: DomElement;
  public listeners: string[];
  public name: string;

  constructor($root: DomElement, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided from DomListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  public initDOMListeners(): void {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name} component`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  public removeDOMListeners(): void {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

function getMethodName(eventName: string): string {
  return 'on' + capitalize(eventName);
}
