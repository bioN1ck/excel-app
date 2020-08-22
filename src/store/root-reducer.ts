import { Action, State, ActionType, StateKey } from '@models/store.model';


export function rootReducer(state: State, action: Action): State {

  let field: string;

  switch (action.type) {
    case ActionType.TABLE_RESIZE:
      field = action.payload.type + 'State';
      return {...state, [field]: value(state, field, action)};

    case ActionType.CHANGE_TEXT:
      field = StateKey.DATA_STATE;
      return {
        ...state,
        currentText: action.payload.value as string,
        [field]: value(state, field, action),
      };

    case ActionType.CHANGE_STYLES:
      return {...state, currentStyles: action.payload.styles};

    case ActionType.APPLY_STYLE:
      field = StateKey.STYLE_STATE;
      const val = state[field] || {};
      action.payload.ids.forEach(id => {
        val[id] = {...val[id], ...action.payload.styles};
      });
      return {
        ...state,
        styleState: val,
        currentStyles: {
          ...state.currentStyles,
          ...action.payload.styles,
        },
      };

    case ActionType.CHANGE_TITLE:
      return {...state, title: action.payload.value as string};

    case ActionType.UPDATE_DATE:
      return {...state, openedAt: new Date().toJSON()};

    default: return state;
  }

}

const value = (state: State, field: string, action: Action) => {
  const val = state[field] || {};
  val[action.payload.id] = action.payload.value;
  return val;
};
