import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselItems = block.querySelectorAll('[data-aue-model="carouselItem"]');

  const wrapper = document.createElement('div');
  wrapper.classList.add('carousel-wrapper');

  carouselItems.forEach((itemNode) => {
    const itemWrapper = document.createElement('div');
    itemWrapper.classList.add('carousel-item');

    const videoEl = itemNode.querySelector('[data-aue-prop="video"]');
    const imageEl = itemNode.querySelector('[data-aue-prop="image"]');
    const ctaLinkEl = itemNode.querySelector('[data-aue-prop="ctaLink"]');
    const ctaTextEl = itemNode.querySelector('[data-aue-prop="ctaText"]');

    if (videoEl) {
      const videoContainer = document.createElement('div');
      videoContainer.classList.add('carousel-video-container');
      videoContainer.append(videoEl);
      moveInstrumentation(videoEl, videoContainer);
      itemWrapper.append(videoContainer);
    } else if (imageEl) {
      const picture = createOptimizedPicture(imageEl.src, imageEl.alt);
      itemWrapper.append(picture);
      moveInstrumentation(imageEl, picture);
    }

    if (ctaLinkEl && ctaTextEl) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta');
      const link = document.createElement('a');
      link.href = ctaLinkEl.href;
      link.textContent = ctaTextEl.textContent;
      ctaWrapper.append(link);
      moveInstrumentation(ctaLinkEl, link);
      moveInstrumentation(ctaTextEl, link);
      itemWrapper.append(ctaWrapper);
    } else if (ctaLinkEl) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta');
      const link = document.createElement('a');
      link.href = ctaLinkEl.href;
      link.textContent = ctaLinkEl.textContent || 'Learn More'; // Fallback text
      ctaWrapper.append(link);
      moveInstrumentation(ctaLinkEl, link);
      itemWrapper.append(ctaWrapper);
    }

    wrapper.append(itemWrapper);
    moveInstrumentation(itemNode, itemWrapper);
  });

  block.textContent = '';
  block.append(wrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
