import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('banner-section');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('position-relative', 'banner-section__wrapper');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.querySelector('video') || div.querySelector('a[href$=".mp4"]')) {
        div.className = 'banner-video-wrapper';
      } else if (div.querySelector('a')) {
        div.className = 'banner-cta-wrapper';
      }
    });
    section.append(item);
  });

  block.textContent = '';
  block.append(section);
}
