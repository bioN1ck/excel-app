
const CODES = {
  A: 65,
  Z: 90,
};

function createRow(index: number | string, content: string) {
  return `
    <div class="row">
      <div class="row-info">${index}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toColumn(col: string) {
  return `<div class="column">${col}</div>`;
}

function toCell() {
  return `<div class="cell" contenteditable></div>`;
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
