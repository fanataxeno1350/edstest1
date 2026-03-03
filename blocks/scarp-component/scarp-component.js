import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const scarpComponent = document.createElement('div');
  scarpComponent.className = 'scarp-component scarp-fade-in';
  scarpComponent.setAttribute('data-fade-in', '');

  const scarpContainer = document.createElement('div');
  scarpContainer.className = 'scarp-component__scarp_container';

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
        newImg.classList.add('scarp-component__scarp-separator__scarp', 'scarp-green-scarp');
        newImg.setAttribute('aria-hidden', 'true');
        scarpContainer.append(optimizedPic);
      }
    }
  }

  scarpComponent.append(scarpContainer);
  block.textContent = '';
  block.append(scarpComponent);
}
