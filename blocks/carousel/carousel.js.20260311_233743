import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselItems = block.querySelectorAll('[data-aue-model="carouselItem"]');

  const wrapper = document.createElement('div');
  wrapper.classList.add('carousel-wrapper');

  carouselItems.forEach((itemNode) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');

    const videoElement = itemNode.querySelector('[data-aue-prop="video"]');
    const imageElement = itemNode.querySelector('[data-aue-prop="image"]');
    const linkElement = itemNode.querySelector('[data-aue-prop="link"] .carousel-cmp-button');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');
      videoWrapper.append(videoElement);
      moveInstrumentation(videoElement, videoWrapper);
      slide.append(videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      slide.append(picture);
      moveInstrumentation(imageElement, picture);
    }

    if (linkElement) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta-wrapper');
      const link = document.createElement('a');
      link.href = linkElement.href;
      link.textContent = linkElement.querySelector('.carousel-cmp-button__text')?.textContent || '';
      link.className = linkElement.className;
      link.target = linkElement.target;
      ctaWrapper.append(link);
      moveInstrumentation(linkElement, ctaWrapper);
      slide.append(ctaWrapper);
    }

    wrapper.append(slide);
    moveInstrumentation(itemNode, slide);
  });

  block.textContent = '';
  block.append(wrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
