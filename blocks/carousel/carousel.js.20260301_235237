import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper-container');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  [...block.children].forEach((row) => {
    const swiperSlide = document.createElement('div');
    moveInstrumentation(row, swiperSlide);
    swiperSlide.classList.add('swiper-slide');

    const videoCell = row.children[0];
    const imageCell = row.children[1];
    const altCell = row.children[2];
    const ctaLinkCell = row.children[3];
    const ctaLabelCell = row.children[4];

    const video = videoCell?.querySelector('a');
    const image = imageCell?.querySelector('img');
    const alt = altCell?.textContent.trim();
    const ctaLink = ctaLinkCell?.querySelector('a');
    const ctaLabel = ctaLabelCell?.textContent.trim();

    if (video) {
      const videoElement = document.createElement('video');
      videoElement.classList.add('carousel-video');
      videoElement.setAttribute('autoplay', '');
      videoElement.setAttribute('loop', '');
      videoElement.setAttribute('muted', '');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('preload', 'metadata');

      const sourceElement = document.createElement('source');
      sourceElement.src = video.href;
      sourceElement.type = 'video/mp4';
      videoElement.append(sourceElement);
      swiperSlide.append(videoElement);
    } else if (image) {
      const optimizedPic = createOptimizedPicture(image.src, alt || image.alt);
      moveInstrumentation(image, optimizedPic.querySelector('img'));
      swiperSlide.append(optimizedPic);
    }

    if (ctaLink && ctaLabel) {
      const ctaButton = document.createElement('a');
      ctaButton.classList.add('carousel-cta-button');
      ctaButton.href = ctaLink.href;
      ctaButton.textContent = ctaLabel;
      swiperSlide.append(ctaButton);
    }

    swiperWrapper.append(swiperSlide);
  });

  swiperContainer.append(swiperWrapper);
  carouselWrapper.append(swiperContainer);

  // Add navigation buttons and pagination if needed (based on the HTML structure)
  // For simplicity, this example only includes the core slide structure.
  // You would typically add elements for 'swiper-button-next', 'swiper-button-prev', and 'swiper-pagination'
  // and then initialize a Swiper instance in the block's JS.

  block.textContent = '';
  block.append(carouselWrapper);
}
