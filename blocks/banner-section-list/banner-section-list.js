import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('banner-section');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('banner-section__wrapper', 'banner-position-relative', 'banner-boing');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.querySelector('video') || div.querySelector('a[href$=".mp4"]')) {
        div.className = 'banner-video-wrapper';
      } else if (div.querySelector('img')) {
        div.classList.add('banner-section-image', 'banner-w-100', 'banner-h-100', 'banner-object-fit-cover', 'banner-media');
      } else if (div.querySelector('a')) {
        div.classList.add('banner-boing__banner--cta', 'banner-position-absolute', 'banner-start-50', 'banner-translate-middle-x', 'banner-w-100');
      } else {
        div.classList.add('banner-boing__banner--cta', 'banner-position-absolute', 'banner-start-50', 'banner-translate-middle-x', 'banner-w-100');
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
