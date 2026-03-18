import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('carousel-position-relative', 'swiper', 'carousel-primary-swiper', 'carousel-primary-swiper-carousel-419d8524f7', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  wrapper.setAttribute('data-swiper-id', '.carousel-primary-swiper-carousel-419d8524f7');
  wrapper.setAttribute('id', 'carousel-419d8524f7');
  wrapper.setAttribute('role', 'group');
  wrapper.setAttribute('aria-live', 'polite');
  wrapper.setAttribute('aria-roledescription', 'carousel');
  wrapper.setAttribute('data-is-autoplay', 'true');
  wrapper.setAttribute('data-delay', '5000');
  wrapper.setAttribute('data-autopause-disabled', 'true');
  wrapper.setAttribute('data-is-loop', 'false');
  wrapper.setAttribute('data-placeholder-text', 'false');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.querySelector('video') || div.querySelector('a[href$=".mp4"]')) {
        div.className = 'carousel-video-wrapper';
      } else if (div.children.length === 1 && div.querySelector('picture')) {
        div.classList.add('carousel-banner-media', 'carousel-banner-image');
      } else if (div.querySelector('img')) {
        div.classList.add('carousel-banner-media', 'carousel-banner-image');
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
