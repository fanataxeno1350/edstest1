import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides-container');

  const authoredSlides = block.querySelectorAll('[data-aue-model="carouselItem"]');

  authoredSlides.forEach((slide) => {
    const slideWrapper = document.createElement('div');
    slideWrapper.classList.add('slide');

    const videoElement = slide.querySelector('[data-aue-prop="video"]');
    const imageElement = slide.querySelector('[data-aue-prop="image"]');
    const ctaLink = slide.querySelector('[data-aue-prop="ctaLink"] .carousel-cmp-button');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('video-wrapper');
      videoWrapper.append(videoElement);
      slideWrapper.append(videoWrapper);
      moveInstrumentation(videoElement, videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      slideWrapper.append(picture);
      moveInstrumentation(imageElement, picture);
    }

    if (ctaLink) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('cta-wrapper');
      const link = document.createElement('a');
      link.href = ctaLink.href;
      link.textContent = ctaLink.querySelector('.carousel-cmp-button__text').textContent.trim();
      if (ctaLink.target) {
        link.target = ctaLink.target;
      }
      ctaWrapper.append(link);
      slideWrapper.append(ctaWrapper);
      moveInstrumentation(ctaLink, ctaWrapper);
    }

    slidesContainer.append(slideWrapper);
    moveInstrumentation(slide, slideWrapper);
  });

  carouselWrapper.append(slidesContainer);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = 'carousel block';
  block.dataset.blockStatus = 'loaded';
}
