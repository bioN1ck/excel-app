export enum StateKey {
  TITLE = 'title',
  COL_STATE = 'colState',
  ROW_STATE = 'rowState',
  DATA_STATE = 'dataState',
  STYLE_STATE = 'styleState',
  CURRENT_TEXT = 'currentText',
  CURRENT_STYLES = 'currentStyles',
}

export interface State {
  [StateKey.TITLE]: string;
  [StateKey.COL_STATE]: ResizeState;
  [StateKey.ROW_STATE]: ResizeState;
  [StateKey.DATA_STATE]: DataState;
  [StateKey.STYLE_STATE]: StyleState;
  [StateKey.CURRENT_TEXT]: string;
  [StateKey.CURRENT_STYLES]: ToolbarState;
}

export type ResizeState = { [key: number]: number };
export type DataState = { [key: string]: string };
export type StyleState = { [key: string]: ToolbarState };

export interface ToolbarState {
  fontStyle: 'normal'|'italic';
  fontWeight: 'bold'|'normal';
  textAlign: 'left'|'center'|'right';
  textDecoration: 'none'|'underline';
}

export enum ActionType {
  INIT = '__INIT__',
  TABLE_RESIZE = 'TABLE_RESIZE',
  CHANGE_TEXT = 'CHANGE_TEXT',
  CHANGE_STYLES = 'CHANGE_STYLES',
  APPLY_STYLE = 'APPLY_STYLE',
  CURRENT_STYLE = 'CURRENT_STYLE',
  CHANGE_TITLE = 'CHANGE_TITLE',
}

export type SubState = ResizeState|DataState|StyleState|string|ToolbarState;

export interface Action {
  type: ActionType;
  payload?: Payload;
}

export interface Payload {
  id?: string;
  ids?: string[];
  type?: string;
  value?: number | string;
  styles?: ToolbarState;
}

export type Reducer = (state: State, action: Action) => State;
