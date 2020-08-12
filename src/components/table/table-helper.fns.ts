import { range } from '@core/utils';
import { CellCoords } from '@models/excel.model';

export function shouldResize(element: HTMLDivElement): boolean {
  return !!element.dataset.resize;
}

export function shouldSelect(element: HTMLDivElement): boolean {
  return element.dataset.type === 'cell';
}

export function matrix(start: CellCoords, end: CellCoords): string[] {
  const cols = range(start.col, end.col);
  const rows = range(start.row, end.row);

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelection(key: string, {col, row}: CellCoords): string {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
  }
  return `[data-id="${row}:${col}"]`;
}
