import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('banner-section__wrapper', 'banner-position-relative', 'banner-boing');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.querySelector('video') || div.querySelector('a[href$=".mp4"]')) {
        div.className = 'banner-video-wrapper';
      } else {
        div.classList.add('banner-cta-wrapper', 'banner-position-absolute', 'banner-start-50', 'banner-translate-middle-x', 'banner-w-100', 'banner-boing__banner--cta');
      }
    });
    wrapper.append(item);
  });

  block.textContent = '';
  block.append(wrapper);
}
