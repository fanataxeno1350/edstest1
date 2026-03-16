import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselItems = block.querySelectorAll('[data-cmp-hook-carousel="item"]');

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('carousel-wrapper');

  carouselItems.forEach((itemNode) => {
    const itemWrapper = document.createElement('div');
    itemWrapper.classList.add('carousel-item');

    const videoElement = itemNode.querySelector('video');
    const imageElement = itemNode.querySelector('img');
    const ctaLink = itemNode.querySelector('.carousel-banner-cta a');

    if (videoElement) {
      const videoContainer = document.createElement('div');
      videoContainer.classList.add('carousel-video-container');
      videoContainer.append(videoElement);
      moveInstrumentation(videoElement, videoContainer);
      itemWrapper.append(videoContainer);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      itemWrapper.append(picture);
      moveInstrumentation(imageElement, picture);
    }

    if (ctaLink) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta');
      const link = document.createElement('a');
      link.href = ctaLink.href;
      link.textContent = ctaLink.querySelector('.carousel-cmp-button__text')?.textContent || '';
      if (ctaLink.target) {
        link.target = ctaLink.target;
      }
      ctaWrapper.append(link);
      moveInstrumentation(ctaLink, ctaWrapper);
      itemWrapper.append(ctaWrapper);
    }

    wrapperDiv.append(itemWrapper);
    moveInstrumentation(itemNode, itemWrapper);
  });

  block.textContent = '';
  block.append(wrapperDiv);
  block.className = 'carousel block';
  block.dataset.blockStatus = 'loaded';
}
