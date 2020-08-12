import { Emitter } from '@core/emitter';
import { DomElement } from '@core/dom-element';

export interface ComponentOptions {
  name?: string;
  listeners?: string[];
  emitter?: Emitter;
}

// Table ------------

export interface CellCoords {
  row: number;
  col: number;
}

// Emitter ----------

export type Args = (number|string|DomElement)[];

export type Listener = ((...args: Args) => void);

export interface ListenerList {
  [key: string]: Listener[];
}
