import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('footer-brand-section');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('footer-brand-container');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.classList.add('footer-brand-logo', 'footer-brand-secondary-logo');
      } else if (div.querySelector('a')) {
        div.classList.add('footer-list-item-link', 'footer-brand-right-link', 'footer-brand-left-link');
      } else {
        div.classList.add('footer-brand-primary-content', 'footer-brand-social-media-title', 'footer-brand-left-copyright');
      }
    });
    section.append(item);
  });

  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(section);
}
