import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('carousel-slides-container');

  const authoredItems = block.querySelectorAll('[data-aue-model="carouselItem"]');

  authoredItems.forEach((itemNode) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');

    const videoElement = itemNode.querySelector('[data-aue-prop="video"]');
    const imageElement = itemNode.querySelector('[data-aue-prop="image"]');
    const linkContainer = itemNode.querySelector('[data-aue-prop="link"]');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');
      const video = document.createElement('video');
      video.setAttribute('title', 'Video');
      video.setAttribute('aria-label', 'Video');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('loop', 'false');
      video.setAttribute('muted', 'true');
      video.setAttribute('autoplay', 'true');

      const source = document.createElement('source');
      source.src = videoElement.src;
      source.type = videoElement.type || 'video/mp4';
      video.append(source);
      videoWrapper.append(video);
      slide.append(videoWrapper);
      moveInstrumentation(videoElement, videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt, true, [{ width: '2000' }]);
      slide.append(picture);
      moveInstrumentation(imageElement, picture);
    }

    if (linkContainer) {
      const link = linkContainer.querySelector('a');
      if (link) {
        const ctaWrapper = document.createElement('div');
        ctaWrapper.classList.add('carousel-cta-wrapper');
        ctaWrapper.append(link);
        slide.append(ctaWrapper);
        moveInstrumentation(linkContainer, ctaWrapper);
      }
    }

    slidesContainer.append(slide);
    moveInstrumentation(itemNode, slide);
  });

  carouselWrapper.append(slidesContainer);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = 'carousel block';
  block.dataset.blockStatus = 'loaded';
}
