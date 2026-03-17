import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('carousel-slides');

  const slideElements = block.querySelectorAll('[data-aue-model="slide"]');

  slideElements.forEach((slideEl) => {
    const slideDiv = document.createElement('div');
    slideDiv.classList.add('carousel-slide');

    const imageEl = slideEl.querySelector('[data-aue-prop="image"]');
    const videoEl = slideEl.querySelector('[data-aue-prop="video"]');
    const ctaLinkEl = slideEl.querySelector('[data-aue-prop="ctaLink"]');
    const ctaLabelEl = slideEl.querySelector('[data-aue-prop="ctaLabel"]');

    let mediaElement;
    if (videoEl) {
      const videoSource = videoEl.querySelector('source');
      if (videoSource && videoSource.src) {
        mediaElement = document.createElement('video');
        mediaElement.setAttribute('controls', '');
        mediaElement.setAttribute('autoplay', '');
        mediaElement.setAttribute('muted', '');
        mediaElement.setAttribute('loop', '');
        mediaElement.setAttribute('playsinline', '');
        mediaElement.setAttribute('preload', 'auto');
        const source = document.createElement('source');
        source.src = videoSource.src;
        source.type = 'video/mp4'; // Assuming mp4, adjust if other types are possible
        mediaElement.append(source);
        moveInstrumentation(videoEl, slideDiv);
      }
    } else if (imageEl) {
      mediaElement = createOptimizedPicture(imageEl.src, imageEl.alt);
      moveInstrumentation(imageEl, slideDiv);
    }

    if (mediaElement) {
      const mediaWrapper = document.createElement('div');
      mediaWrapper.classList.add('carousel-media');
      mediaWrapper.append(mediaElement);
      slideDiv.append(mediaWrapper);
    }

    if (ctaLinkEl && ctaLabelEl) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta');
      const link = document.createElement('a');
      link.href = ctaLinkEl.href || '#';
      link.textContent = ctaLabelEl.textContent || '';
      ctaWrapper.append(link);
      slideDiv.append(ctaWrapper);
      moveInstrumentation(ctaLinkEl, ctaWrapper);
      moveInstrumentation(ctaLabelEl, ctaWrapper);
    } else if (ctaLinkEl) {
      // Fallback for button inside a container
      const buttonContainer = slideEl.querySelector('.button-container a');
      if (buttonContainer) {
        const ctaWrapper = document.createElement('div');
        ctaWrapper.classList.add('carousel-cta');
        const link = document.createElement('a');
        link.href = buttonContainer.href;
        link.textContent = buttonContainer.textContent.trim();
        ctaWrapper.append(link);
        slideDiv.append(ctaWrapper);
        moveInstrumentation(buttonContainer, ctaWrapper);
      }
    }

    slidesContainer.append(slideDiv);
    moveInstrumentation(slideEl, slideDiv);
  });

  carouselWrapper.append(slidesContainer);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}