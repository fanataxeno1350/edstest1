import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('scarp-component__container');

  // Assuming the image is in the first cell of the first row
  const row = block.children[0];
  if (row) {
    const cell = row.children[0];
    if (cell) {
      const img = cell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        const newImg = optimizedPic.querySelector('img');
        moveInstrumentation(img, newImg);
        newImg.classList.add('scarp-component__scarp', 'scarp-green-scarp');
        newImg.setAttribute('aria-hidden', 'true');
        container.append(optimizedPic);
      }
    }
  }

  block.textContent = '';
  block.classList.add('scarp-component', 'scarp-fade-in');
  block.setAttribute('data-fade-in', '');
  block.append(container);
}
