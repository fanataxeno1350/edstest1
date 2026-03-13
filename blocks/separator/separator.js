import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const separatorDiv = document.createElement('div');
  separatorDiv.className = 'separator-separator';

  const hr = document.createElement('hr');
  hr.className = 'separator-separator__horizontal-rule';

  separatorDiv.append(hr);

  block.textContent = '';
  block.append(separatorDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
