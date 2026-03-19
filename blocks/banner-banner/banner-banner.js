import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('banner-banner');

  [...block.children].forEach((row) => {
    const section = document.createElement('section');
    moveInstrumentation(row, section);
    section.classList.add('banner-section');
    while (row.firstElementChild) section.append(row.firstElementChild);
    [...section.children].forEach((div) => {
      if (div.querySelector('video') || div.querySelector('a[href$=".mp4"]')) {
        div.className = 'banner-video-wrapper';
      } else {
        div.classList.add('banner-position-absolute', 'banner-start-50', 'banner-translate-middle-x', 'banner-w-100', 'banner-boing__banner--cta');
      }
    });
    wrapper.append(section);
  });

  block.textContent = '';
  block.append(wrapper);
}
