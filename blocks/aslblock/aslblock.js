import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const aslBlockContainer = document.createElement('div');
  aslBlockContainer.className = 'aslblock-container';

  const figure = document.createElement('figure');
  figure.className = 'aslblock-figure';

  const mainImageWrapper = block.querySelector('[data-aue-prop="mainImage"]');
  if (mainImageWrapper) {
    const mainImg = mainImageWrapper.querySelector('img');
    if (mainImg) {
      const h1 = document.createElement('h1');
      h1.append(createOptimizedPicture(mainImg.src, mainImg.alt));
      figure.append(h1);
      moveInstrumentation(mainImageWrapper, h1);
    }
  }

  const section = document.createElement('section');
  section.className = 'aslblock-text-box';

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.className = 'aslblock-title';
    h2.textContent = titleElement.textContent;
    section.append(h2);
    moveInstrumentation(titleElement, h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.className = 'aslblock-description';
    p.textContent = descriptionElement.textContent;
    section.append(p);
    moveInstrumentation(descriptionElement, p);
  }

  const featuresContainer = block.querySelector('[data-aue-prop="features"]');
  if (featuresContainer) {
    const ul = document.createElement('ul');
    ul.className = 'aslblock-list';

    const featureItems = featuresContainer.querySelectorAll('[data-aue-model="aslBlockListItem"]');
    featureItems.forEach((itemNode) => {
      const li = document.createElement('li');
      li.className = 'aslblock-list-item';

      const featureImageWrapper = itemNode.querySelector('[data-aue-prop="featureImage"]');
      if (featureImageWrapper) {
        const featureImg = featureImageWrapper.querySelector('img');
        if (featureImg) {
          li.append(createOptimizedPicture(featureImg.src, featureImg.alt));
          moveInstrumentation(featureImageWrapper, li.querySelector('picture'));
        }
      }

      const featureTextElement = itemNode.querySelector('[data-aue-prop="featureText"]');
      if (featureTextElement) {
        const span = document.createElement('span');
        span.className = 'aslblock-list-text';
        span.textContent = featureTextElement.textContent;
        li.append(span);
        moveInstrumentation(featureTextElement, span);
      }

      ul.append(li);
      moveInstrumentation(itemNode, li);
    });
    section.append(ul);
    moveInstrumentation(featuresContainer, ul);
  }

  const disclaimerElement = block.querySelector('[data-aue-prop="disclaimer"]');
  if (disclaimerElement) {
    const div = document.createElement('div');
    div.className = 'aslblock-disclaimer';
    div.innerHTML = disclaimerElement.innerHTML;
    section.append(div);
    moveInstrumentation(disclaimerElement, div);
  }

  aslBlockContainer.append(figure, section);

  block.textContent = '';
  block.append(aslBlockContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}