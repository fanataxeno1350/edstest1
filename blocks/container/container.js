import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('container-cmp-container');

  [...block.children].forEach((row) => {
    moveInstrumentation(row, container);
    [...row.children].forEach((cell) => {
      // The container block typically just wraps its children directly.
      // It doesn't have specific content fields to extract from cells
      // but rather expects the cells to contain other blocks or content.
      // Therefore, we append the cell's content directly.
      while (cell.firstChild) {
        container.append(cell.firstChild);
      }
    });
  });

  block.textContent = '';
  block.append(container);
}
