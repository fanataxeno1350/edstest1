import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const scarpComponentDiv = document.createElement('div');
  scarpComponentDiv.className = 'scarp-component scarp-fade-in';
  scarpComponentDiv.setAttribute('data-fade-in', '');

  const scarpContainerDiv = document.createElement('div');
  scarpContainerDiv.className = 'scarp-scarp_container';

  // Assuming the block has only one row and the image is in the first cell
  const row = block.children[0];
  if (row) {
    moveInstrumentation(row, scarpComponentDiv);
    const cell = row.children[0];
    if (cell) {
      const img = cell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        const newImg = optimizedPic.querySelector('img');
        newImg.className = 'scarp-separator__scarp scarp-green-scarp';
        newImg.setAttribute('aria-hidden', 'true');
        scarpContainerDiv.append(optimizedPic);
      }
    }
  }

  scarpComponentDiv.append(scarpContainerDiv);

  block.textContent = '';
  block.append(scarpComponentDiv);
}
