import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const aslBlockContainer = document.createElement('div');
  aslBlockContainer.classList.add('aslblock-container');

  const imageElement = block.querySelector('[data-aue-prop="image"]');
  if (imageElement) {
    const figure = document.createElement('figure');
    const h1 = document.createElement('h1');
    const img = imageElement.querySelector('img');
    if (img) {
      h1.append(createOptimizedPicture(img.src, img.alt));
    } else {
      // Fallback for image if not directly img tag under data-aue-prop
      const imgLink = imageElement.querySelector('a[href$=".jpeg"], a[href$=".png"], a[href$=".jpg"], a[href$=".webp"]');
      if (imgLink) {
        h1.append(createOptimizedPicture(imgLink.href, ''));
      }
    }
    figure.append(h1);
    aslBlockContainer.append(figure);
    moveInstrumentation(imageElement, figure);
  }

  const sectionTextBox = document.createElement('section');
  sectionTextBox.classList.add('aslblock-text-box');

  const headingElement = block.querySelector('[data-aue-prop="heading"]');
  if (headingElement) {
    const h2 = document.createElement('h2');
    h2.textContent = headingElement.textContent.trim();
    sectionTextBox.append(h2);
    moveInstrumentation(headingElement, h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.innerHTML = descriptionElement.innerHTML.trim(); // Use innerHTML for rich text
    sectionTextBox.append(p);
    moveInstrumentation(descriptionElement, p);
  }

  const disclaimerElement = block.querySelector('[data-aue-prop="disclaimer"]');
  if (disclaimerElement) {
    const disclaimerDiv = document.createElement('div');
    disclaimerDiv.classList.add('aslblock-disclaimer');
    disclaimerDiv.innerHTML = disclaimerElement.innerHTML.trim(); // Use innerHTML for rich text
    sectionTextBox.append(disclaimerDiv);
    moveInstrumentation(disclaimerElement, disclaimerDiv);
  }

  if (sectionTextBox.children.length > 0) {
    aslBlockContainer.append(sectionTextBox);
  }

  block.textContent = '';
  block.append(aslBlockContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
