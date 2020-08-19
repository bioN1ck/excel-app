import { Emitter } from '@core/emitter';
import { DomElement } from '@core/dom-element';
import { Store } from '@store/store';
import { StateKey, ToolbarState } from '@models/store.model';


export enum EventKey {
  INPUT = 'input',
  KEYDOWN = 'keydown',
  MOUSEDOWN = 'mousedown',
  CLICK = 'click',
}

export interface ComponentOptions {
  name?: string;
  listeners?: EventKey[];
  emitter?: Emitter;
  store?: Store;
  subscribe?: StateKey[];
}

// Table ------------

export interface CellCoords {
  row: number;
  col: number;
}

// Emitter ----------

export type Args = (number|string|DomElement|Partial<ToolbarState>)[];

export type Listener = ((...args: Args) => void);

export interface ListenerList {
  [key: string]: Listener[];
}
