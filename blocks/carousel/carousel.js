import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const slides = [...block.querySelectorAll('[data-aue-model="carouselSlide"]')];

  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  slides.forEach((slide) => {
    const slideWrapper = document.createElement('div');
    slideWrapper.classList.add('carousel-slide');

    const videoEl = slide.querySelector('[data-aue-prop="video"]');
    const imageEl = slide.querySelector('[data-aue-prop="image"]');
    const ctaLinkEl = slide.querySelector('[data-aue-prop="ctaLink"]');
    const ctaTextEl = slide.querySelector('[data-aue-prop="ctaText"]');

    if (videoEl) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('video-wrapper');
      const video = document.createElement('video');
      video.controls = true;
      video.muted = true;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
      const source = document.createElement('source');
      source.src = videoEl.getAttribute('src') || videoEl.textContent.trim();
      source.type = 'video/mp4';
      video.append(source);
      videoWrapper.append(video);
      slideWrapper.append(videoWrapper);
      moveInstrumentation(videoEl, videoWrapper);
    } else if (imageEl) {
      const picture = createOptimizedPicture(imageEl.src, imageEl.alt);
      slideWrapper.append(picture);
      moveInstrumentation(imageEl, picture);
    }

    if (ctaLinkEl && ctaTextEl) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta');
      const link = document.createElement('a');
      link.href = ctaLinkEl.href || ctaLinkEl.textContent.trim();
      link.textContent = ctaTextEl.textContent.trim();
      ctaWrapper.append(link);
      slideWrapper.append(ctaWrapper);
      moveInstrumentation(ctaLinkEl, ctaWrapper);
      moveInstrumentation(ctaTextEl, ctaWrapper);
    } else if (ctaLinkEl) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta');
      const link = document.createElement('a');
      link.href = ctaLinkEl.href || ctaLinkEl.textContent.trim();
      // Attempt to find authored link text within the button container
      const authoredLinkText = slide.querySelector('.button-container a');
      if (authoredLinkText) {
        link.textContent = authoredLinkText.textContent.trim();
      } else {
        link.textContent = link.href;
      }
      ctaWrapper.append(link);
      slideWrapper.append(ctaWrapper);
      moveInstrumentation(ctaLinkEl, ctaWrapper);
    }

    carouselWrapper.append(slideWrapper);
    moveInstrumentation(slide, slideWrapper);
  });

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
