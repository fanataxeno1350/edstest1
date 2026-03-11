import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselItems = block.querySelectorAll('[data-aue-model="carouselItem"]');

  const wrapper = document.createElement('div');
  wrapper.classList.add('carousel-wrapper');

  const slideContainer = document.createElement('div');
  slideContainer.classList.add('carousel-slide-container');

  carouselItems.forEach((itemNode) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');

    const videoElement = itemNode.querySelector('[data-aue-prop="video"]');
    const imageElement = itemNode.querySelector('[data-aue-prop="image"]');
    const ctaLinkElement = itemNode.querySelector('[data-aue-prop="ctaLink"]');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');
      videoWrapper.append(videoElement);
      slide.append(videoWrapper);
      moveInstrumentation(videoElement, videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      slide.append(picture);
      moveInstrumentation(imageElement, picture);
    }

    if (ctaLinkElement) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta-wrapper');
      const link = ctaLinkElement.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent.trim();
        // Preserve original attributes if needed, e.g., target, classes
        if (link.target) newLink.target = link.target;
        if (link.className) newLink.className = link.className;
        ctaWrapper.append(newLink);
        moveInstrumentation(link, newLink);
      } else {
        // Fallback for plain text CTA if no <a> is found directly under data-aue-prop
        const ctaText = document.createElement('p');
        ctaText.textContent = ctaLinkElement.textContent.trim();
        ctaWrapper.append(ctaText);
        moveInstrumentation(ctaLinkElement, ctaText);
      }
      slide.append(ctaWrapper);
    }

    slideContainer.append(slide);
    moveInstrumentation(itemNode, slide);
  });

  wrapper.append(slideContainer);

  // Add navigation buttons and pagination (example, adjust as needed)
  const navButtons = document.createElement('div');
  navButtons.classList.add('carousel-navigation');
  navButtons.innerHTML = `
    <button class="carousel-prev">&#10094;</button>
    <button class="carousel-next">&#10095;</button>
  `;
  wrapper.append(navButtons);

  const pagination = document.createElement('div');
  pagination.classList.add('carousel-pagination');
  wrapper.append(pagination);

  block.textContent = '';
  block.append(wrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
