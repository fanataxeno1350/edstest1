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
    const ctaEl = itemNode.querySelector('[data-aue-prop="cta"]');

    if (videoEl) {
      const videoContainer = document.createElement('div');
      videoContainer.classList.add('video-container');
      const video = document.createElement('video');
      video.setAttribute('controls', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('loop', '');
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      const source = document.createElement('source');
      source.src = videoEl.getAttribute('href') || videoEl.textContent.trim();
      source.type = 'video/mp4';
      video.append(source);
      videoContainer.append(video);
      itemWrapper.append(videoContainer);
      moveInstrumentation(videoEl, videoContainer);
    } else if (imageEl) {
      const picture = createOptimizedPicture(imageEl.src, imageEl.alt);
      itemWrapper.append(picture);
      moveInstrumentation(imageEl, picture);
    }

    if (ctaEl) {
      const ctaContainer = document.createElement('div');
      ctaContainer.classList.add('carousel-cta');
      const link = ctaEl.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent.trim();
        // Copy over relevant attributes from the original link
        Array.from(link.attributes).forEach(attr => {
          if (attr.name !== 'href' && attr.name !== 'id') {
            newLink.setAttribute(attr.name, attr.value);
          }
        });
        newLink.classList.add('cmp-button', 'analytics_cta_click', 'text-center', 'cta-layout');
        const span = document.createElement('span');
        span.classList.add('cmp-button__text', 'primary-btn', 'w-75', 'p-5', 'rounded-pill', 'd-inline-flex', 'justify-content-center', 'align-items-center', 'famlf-cta-btn');
        span.textContent = newLink.textContent;
        newLink.textContent = ''; // Clear text content to append span
        newLink.append(span);
        ctaContainer.append(newLink);
      }
      itemWrapper.append(ctaContainer);
      moveInstrumentation(ctaEl, ctaContainer);
    }

    wrapper.append(itemWrapper);
    moveInstrumentation(itemNode, itemWrapper);
  });

  block.textContent = '';
  block.append(wrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
