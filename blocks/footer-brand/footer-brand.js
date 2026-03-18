import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('footer-brand-container-hd', 'footer-brand-p-0');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('footer-brand-footer-brand', 'footer-brand-w-100', 'footer-brand-bg-boing-neutral-gray-600');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.classList.add('footer-brand-footer-brand__logo', 'footer-brand-d-inline-block', 'footer-brand-analytics_cta_click');
      } else if (div.querySelector('a')) {
        div.classList.add('footer-brand-footer-brand__left--link', 'footer-brand-analytics_cta_click');
      } else {
        div.classList.add('footer-brand-footer-brand__left--copyright', 'footer-brand-text-center');
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
