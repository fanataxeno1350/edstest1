import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('carousel-wrapper');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('swiper-slide', 'carousel-primary-swiper-slide', 'carousel-cmp-carousel__item--active', 'carousel-swiper-slide-prev');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.querySelector('video') || div.querySelector('a[href$=".mp4"]')) {
        div.className = 'carousel-video-wrapper';
      } else if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'carousel-banner-image';
      } else if (div.querySelector('a')) {
        div.className = 'carousel-banner-cta';
      } else {
        div.className = 'carousel-banner';
      }
    });
    wrapper.append(item);
  });

  wrapper.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(wrapper);
}
