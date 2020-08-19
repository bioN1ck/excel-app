import { State, ResizeState } from '@models/store.model';
import { toInlineStyles, parse } from '@core/utils';
import { DEFAULT_STYLES } from '@constants';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state: ResizeState, index: number): string {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function createRow(
  index: number | string,
  content: string,
  height: number = DEFAULT_HEIGHT,
): string {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div
      class="row"
      data-type="resizable"
      data-row="${index}"
      style="height: ${height}px"
    >
      <div class="row-info">
        ${index}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toColumn({col, index, width}): string {
  return `
    <div
      class="column"
      data-type="resizable"
      data-col="${index}"
      style="width: ${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function toCell(row: number, state: State): (_: string, i: number) => string {
  return (_: string, col: number) => {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const data = state.dataState[id] || '';
    const styles = toInlineStyles({
      ...DEFAULT_STYLES,
      ...state.styleState[id],
    });
    return `
      <div
        class="cell"
        contenteditable
        data-id="${id}"
        data-col="${col}"
        data-type="cell"
        data-value="${data}"
        style="${styles}; width: ${width}"
      >
        ${parse(data)}
      </div>
    `;
  };
}

function toChar(_: null, index: number): string {
  return String.fromCharCode(CODES.A + index);
}

function widthFromState(state: State) {
  return (col: string, index: number) => {
    return { col, index, width: getWidth(state?.colState || {}, index) };
  };
}

export function createTable(rowsCount = 15, state: State) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const firstRow = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(widthFromState(state))
    .map(toColumn)
    .join('');

  rows.push(createRow('', firstRow));

  for (let row = 0; row < rowsCount; row++) {
    const otherRow = new Array(colsCount)
      .fill('')
      .map(toCell(row, state))
      .join('');

    rows.push(createRow(row + 1, otherRow, state.rowState[row + 1]));
  }

  return rows.join('');
}
