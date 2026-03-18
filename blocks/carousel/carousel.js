import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const slides = block.querySelectorAll('[data-aue-model="carouselSlide"]');
  slides.forEach((slide) => {
    const slideWrapper = document.createElement('div');
    slideWrapper.classList.add('carousel-slide');

    const videoEl = slide.querySelector('[data-aue-prop="video"]');
    const imageEl = slide.querySelector('[data-aue-prop="image"]');
    const ctaLinkContainer = slide.querySelector('[data-aue-prop="ctaLink"]');

    if (videoEl) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');
      const video = document.createElement('video');
      video.setAttribute('controls', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      video.setAttribute('loop', '');

      const source = document.createElement('source');
      source.setAttribute('src', videoEl.src || videoEl.href);
      source.setAttribute('type', 'video/mp4');
      video.append(source);
      videoWrapper.append(video);
      moveInstrumentation(videoEl, videoWrapper);
      slideWrapper.append(videoWrapper);
    } else if (imageEl) {
      const picture = createOptimizedPicture(imageEl.src, imageEl.alt);
      slideWrapper.append(picture);
      moveInstrumentation(imageEl, picture);
    } else {
      // Fallback for image if no data-aue-prop is found but an img exists
      const img = slide.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        slideWrapper.append(picture);
        moveInstrumentation(img, picture);
      }
    }

    if (ctaLinkContainer) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta');
      const ctaLink = ctaLinkContainer.querySelector('a');
      if (ctaLink) {
        const newCtaLink = document.createElement('a');
        newCtaLink.href = ctaLink.href;
        newCtaLink.textContent = ctaLink.textContent.trim();
        newCtaLink.classList.add('button', 'primary');
        ctaWrapper.append(newCtaLink);
        moveInstrumentation(ctaLink, newCtaLink);
      }
      slideWrapper.append(ctaWrapper);
      moveInstrumentation(ctaLinkContainer, ctaWrapper);
    }

    carouselWrapper.append(slideWrapper);
    moveInstrumentation(slide, slideWrapper);
  });

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
