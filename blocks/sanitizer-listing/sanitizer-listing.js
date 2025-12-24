import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const containerInDiv = document.createElement('div');
  containerInDiv.className = 'antisept-sanitizer-container-in';

  const containerDiv = document.createElement('div');
  containerDiv.className = 'antisept-sanitizer-container antisept-sanitizer-asl-sanitizer';

  const sanitizerItems = block.querySelectorAll('[data-aue-model="sanitizer"]');
  sanitizerItems.forEach((sanitizerNode) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'antisept-sanitizer-col-sm-4 antisept-sanitizer-EqualWidth';

    const article = document.createElement('article');
    article.className = 'antisept-sanitizer-sanitizer-text';

    const textElement = sanitizerNode.querySelector('[data-aue-prop="text"]');
    if (textElement) {
      article.append(textElement);
      moveInstrumentation(textElement, article);
    }

    colDiv.append(article);
    moveInstrumentation(sanitizerNode, colDiv);
    containerDiv.append(colDiv);
  });

  containerInDiv.append(containerDiv);

  block.textContent = '';
  block.append(containerInDiv);

  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
