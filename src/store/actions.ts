import { ActionType, Action, Payload } from '@models/store.model';


// Action creator
export function tableResize(payload: Payload): Action {
  return {
    type: ActionType.TABLE_RESIZE,
    payload,
  };
}

export function changeText(payload: Payload): Action {
  return {
    type: ActionType.CHANGE_TEXT,
    payload,
  };
}

export function changeStyles(payload: Payload): Action {
  return {
    type: ActionType.CHANGE_STYLES,
    payload,
  };
}

export function applyStyle(payload: Payload): Action {
  return {
    type: ActionType.APPLY_STYLE,
    payload,
  };
}

export function changeTitle(payload: Payload): Action {
  return {
    type: ActionType.CHANGE_TITLE,
    payload,
  };
}
