import { DomElement } from '@core/dom-element';
import { $ } from '@core/dom-element';

enum Direction {
  COL = 'col',
  ROW = 'row',
}


export function resizeHandler($root: DomElement, target: HTMLDivElement): void {

  const $resizer = $(target);
  const $parent = $resizer.closest('[data-type="resizable"]');

  const coords = $parent.getCoords();
  const direction = $resizer.data.resize;
  let width: number;
  let height: number;

  document.onmousemove = ({clientX, clientY}: MouseEvent): void => {
    if (direction === Direction.COL) {
      const delta = clientX - coords.right;
      $resizer.css({right: -delta + 'px'});
      width = coords.width + delta;
    } else {
      const delta = clientY - coords.bottom;
      $resizer.css({bottom: -delta + 'px'});
      height = coords.height + delta;
    }
  };

  document.onmouseup = (): void => {
    if (direction === Direction.COL) {
      $parent.css({width: width + 'px'});
      $root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach((el: HTMLDivElement) => el.style.width = width + 'px');
      $resizer.css({right: '0'});
    } else {
      $parent.css({height: height + 'px'});
      $resizer.css({bottom: '0'});
    }

    document.onmousemove = null;
    document.onmouseup = null;
  };
}
