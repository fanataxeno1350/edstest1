import { createOptimizedPicture } from '../../../scripts/aem.js';
import { moveInstrumentation } from '../../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('header-section-root', 'position-relative', 'mb-15');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.querySelector('span.d-none.header-app-name')) {
        div.className = 'header-app-name';
      } else if (div.querySelector('header.header-root')) {
        div.classList.add('header-root', 'boing-container', 'd-flex', 'justify-content-between', 'align-items-center', 'h-15', 'px-5', 'py-2', 'fixed-top', 'w-100', 'bg-white');
      } else if (div.querySelector('div.header-submenu-container')) {
        div.classList.add('header-submenu-container', 'position-fixed', 'top-0', 'start-0', 'end-0', 'm-auto', 'overflow-hidden');
      } else {
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
