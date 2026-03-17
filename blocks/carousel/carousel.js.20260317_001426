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
    const ctaLinkElement = slide.querySelector('[data-aue-prop="ctaLink"]');
    const ctaTextElement = slide.querySelector('[data-aue-prop="ctaText"]');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('video-wrapper');
      const video = document.createElement('video');
      video.setAttribute('autoplay', '');
      video.setAttribute('loop', '');
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      const source = document.createElement('source');
      source.src = videoElement.href || videoElement.textContent.trim();
      source.type = 'video/mp4';
      video.append(source);
      videoWrapper.append(video);
      slideWrapper.append(videoWrapper);
      moveInstrumentation(videoElement, videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      slideWrapper.append(picture);
      moveInstrumentation(imageElement, picture);
    }

    if (ctaLinkElement && ctaTextElement) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('cta-wrapper');
      const ctaLink = document.createElement('a');
      ctaLink.href = ctaLinkElement.href || ctaLinkElement.textContent.trim();
      ctaLink.textContent = ctaTextElement.textContent.trim();
      ctaWrapper.append(ctaLink);
      slideWrapper.append(ctaWrapper);
      moveInstrumentation(ctaLinkElement, ctaLink);
      moveInstrumentation(ctaTextElement, ctaLink);
    }

    slidesContainer.append(slideWrapper);
    moveInstrumentation(slide, slideWrapper);
  });

  carouselWrapper.append(slidesContainer);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}