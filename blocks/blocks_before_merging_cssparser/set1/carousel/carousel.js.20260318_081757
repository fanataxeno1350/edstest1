import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('carousel-wrapper');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('carousel-swiper-slide', 'carousel-primary-swiper-slide', 'carousel-cmp-carousel__item--active', 'carousel-swiper-slide-prev');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.querySelector('video') || div.querySelector('a[href$=".mp4"]')) {
        div.className = 'carousel-video-wrapper';
      } else if (div.querySelector('a')) {
        div.className = 'carousel-banner-cta';
      } else {
        div.classList.add('carousel-banner', 'carousel-banner-section', 'carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper', 'carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');
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
