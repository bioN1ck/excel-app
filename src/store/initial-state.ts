import { storage } from '@core/utils';
import { State } from '@models/store.model';
import { DEFAULT_TITLE, DEFAULT_STYLES } from '@constants';

const defaultState: State = {
  title: DEFAULT_TITLE,
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

const st = storage('excel-state');
export const initialState: State = st ? normalize(st) : defaultState;
