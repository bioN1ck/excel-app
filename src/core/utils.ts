export const capitalize = (value: string): string => {
  if (typeof value !== 'string') { return ''; }
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export function range(start: number, end: number): number[] {
  if (start > end) { [end, start] = [start, end]; }
  return new Array(end - start + 1)
    .fill('')
    .map((_, i) => start + i);
}
