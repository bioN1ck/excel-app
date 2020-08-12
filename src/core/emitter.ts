import { ListenerList, Args, Listener } from '@models/excel.model';


export class Emitter {
  private listeners: ListenerList;

  constructor() {
    this.listeners = {} as ListenerList;
  }

  // Броадкастим новое значение
  public next(event: string, ...args: Args): void {
    if (Array.isArray(this.listeners)) {
      return;
    }
    // Проходим по массиву и дергаем функции для каждого фоловера
    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }

  // Подписываемся на броадкаст конкретного события
  public subscribe(event: string, fn: (...data: Args) => void): () => Listener[] {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => this.listeners[event] = this.listeners[event].filter(l => l !== fn);
  }
}
