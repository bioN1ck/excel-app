
const CODES = {
  A: 65,
  Z: 90,
};

function createRow(index: number | string, content: string) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toColumn(col: string, index: number) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function toCell(_: null, col: number) {
  return `<div class="cell" contenteditable data-col="${col}"></div>`;
}

function toChar(_: null, index: number) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const firstRow = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('');

  rows.push(createRow('', firstRow));

  for (let i = 0; i < rowsCount; i++) {
    const otherRow = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('');

    rows.push(createRow(i + 1, otherRow));
  }

  return rows.join('');
}
