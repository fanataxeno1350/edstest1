import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides-container');

  const items = block.querySelectorAll('[data-cmp-hook-carousel="item"]');

  items.forEach((itemNode) => {
    const slide = document.createElement('div');
    slide.classList.add('slide');

    const videoElement = itemNode.querySelector('video');
    const imageElement = itemNode.querySelector('img');
    const ctaContainer = itemNode.querySelector('.carousel-banner-cta');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('video-wrapper');

      const sourceElement = videoElement.querySelector('source');
      if (sourceElement) {
        const newVideo = document.createElement('video');
        newVideo.setAttribute('controls', '');
        newVideo.setAttribute('autoplay', '');
        newVideo.setAttribute('muted', '');
        newVideo.setAttribute('loop', '');
        newVideo.setAttribute('playsinline', '');
        newVideo.setAttribute('preload', 'metadata');
        newVideo.setAttribute('title', videoElement.getAttribute('title') || '');
        newVideo.setAttribute('aria-label', videoElement.getAttribute('aria-label') || '');

        const newSource = document.createElement('source');
        newSource.setAttribute('src', sourceElement.getAttribute('src'));
        newSource.setAttribute('type', sourceElement.getAttribute('type'));
        newVideo.append(newSource);
        videoWrapper.append(newVideo);
        moveInstrumentation(videoElement, videoWrapper);
      }
      slide.append(videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      slide.append(picture);
      moveInstrumentation(imageElement, picture);
    }

    if (ctaContainer) {
      const ctaLink = ctaContainer.querySelector('a');
      if (ctaLink) {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const newCta = document.createElement('a');
        newCta.href = ctaLink.href;
        newCta.textContent = ctaLink.textContent.trim();
        if (ctaLink.target) {
          newCta.target = ctaLink.target;
        }

        buttonContainer.append(newCta);
        slide.append(buttonContainer);
        moveInstrumentation(ctaLink, buttonContainer);
      }
    }

    slidesContainer.append(slide);
    moveInstrumentation(itemNode, slide);
  });

  carouselWrapper.append(slidesContainer);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
