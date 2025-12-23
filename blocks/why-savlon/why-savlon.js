import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const whySavlonContainer = document.createElement('div');
  whySavlonContainer.className = 'why-savlon-container';

  const figure = document.createElement('figure');
  figure.className = 'why-savlon-figure';
  const imageWrapper = block.querySelector('[data-aue-prop="image"]');
  if (imageWrapper) {
    const picture = createOptimizedPicture(imageWrapper.src, imageWrapper.alt);
    figure.append(picture);
    moveInstrumentation(imageWrapper, picture);
  }

  const section = document.createElement('section');
  section.className = 'why-savlon-text-box';

  const titleWrapper = block.querySelector('[data-aue-prop="title"]');
  if (titleWrapper) {
    const h2 = document.createElement('h2');
    h2.className = 'why-savlon-white';
    h2.innerHTML = titleWrapper.innerHTML;
    section.append(h2);
    moveInstrumentation(titleWrapper, h2);
  }

  const descriptionWrapper = block.querySelector('[data-aue-prop="description"]');
  if (descriptionWrapper) {
    const p = document.createElement('p');
    p.innerHTML = descriptionWrapper.innerHTML;
    section.append(p);
    moveInstrumentation(descriptionWrapper, p);
  }

  const disclaimerWrapper = block.querySelector('[data-aue-prop="disclaimer"]');
  if (disclaimerWrapper) {
    const div = document.createElement('div');
    div.className = 'why-savlon-dis';
    div.innerHTML = disclaimerWrapper.innerHTML;
    section.append(div);
    moveInstrumentation(disclaimerWrapper, div);
  }

  whySavlonContainer.append(figure, section);

  block.textContent = '';
  block.append(whySavlonContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
