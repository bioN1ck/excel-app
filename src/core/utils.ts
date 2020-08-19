import { State } from '@models/store.model';


export const capitalize = (value: string): string => {
  if (typeof value !== 'string') { return ''; }
  return value.charAt(0).toUpperCase() + value.slice(1);
};


export const range = (start: number, end: number): number[] => {
  if (start > end) { [end, start] = [start, end]; }
  return new Array(end - start + 1)
    .fill('')
    .map((_, i) => start + i);
};


export const storage = (key: string, data = null): State => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
};


export const isEqual = (a: {}|string|number, b: {}|string|number): boolean => {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
};


export const camalToDashCase = (str: string): string => {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
};


export const toInlineStyles = (styles = {}): string => {
  return Object.keys(styles)
    .map(key => `${camalToDashCase(key)}: ${styles[key]}`)
    .join('; ');
};


export const debounce = (fn: (...args: State[]) => void, wait: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: State[]) => {
    const later = () => {
      clearTimeout(timer);
      fn(...args);
    };
    clearTimeout(timer);
    timer = setTimeout(later, wait);
  };
};


export const parse = (value: string = ''): string => {
  if (value.startsWith('=')) {
    try {
      // tslint:disable-next-line: no-eval
      return eval(value.slice(1));
    } catch (e) {
      return value;
    }
  }
  return value;
};
