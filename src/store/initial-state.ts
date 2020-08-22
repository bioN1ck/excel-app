import { State } from '@models/store.model';
import { DEFAULT_TITLE, DEFAULT_STYLES } from '@constants';

const defaultState: State = {
  title: DEFAULT_TITLE,
  openedAt: new Date().toJSON(),
  rowState: {},
  colState: {},
  dataState: {},
  styleState: {},
  currentText: '',
  currentStyles: DEFAULT_STYLES,
};

const normalize = (state: State): State => ({
  ...state,
  currentStyles: DEFAULT_STYLES,
  currentText: '',
});

export const normalizeInitialState = (state: State) => {
  return state ? normalize(state) : {...defaultState};
};
