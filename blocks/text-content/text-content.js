import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('text-content-container');

  [...block.children].forEach((row) => {
    moveInstrumentation(row, container);
    [...row.children].forEach((cell) => {
      const heading = cell.querySelector('h1');
      if (heading) {
        const newHeading = document.createElement('h1');
        newHeading.classList.add('text-content-heading');
        newHeading.innerHTML = heading.innerHTML;
        container.append(newHeading);
      }
    });
  });

  block.textContent = '';
  block.append(container);
}
