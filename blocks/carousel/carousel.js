import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides-container');

  const items = block.querySelectorAll('[data-aue-model="carouselItem"]');
  items.forEach((itemNode) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');

    const videoEl = itemNode.querySelector('[data-aue-prop="video"]');
    const imageEl = itemNode.querySelector('[data-aue-prop="image"]');
    const ctaLinkEl = itemNode.querySelector('[data-aue-prop="ctaLink"]');
    const ctaTextEl = itemNode.querySelector('[data-aue-prop="ctaText"]');

    if (videoEl) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('video-wrapper');
      const video = document.createElement('video');
      video.setAttribute('muted', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('loop', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      const source = document.createElement('source');
      source.src = videoEl.href;
      source.type = 'video/mp4';
      video.append(source);
      videoWrapper.append(video);
      slide.append(videoWrapper);
      moveInstrumentation(videoEl, videoWrapper);
    } else if (imageEl) {
      const picture = createOptimizedPicture(imageEl.src, imageEl.alt, true, [{ width: '2000' }]);
      slide.append(picture);
      moveInstrumentation(imageEl, picture);
    }

    if (ctaLinkEl || ctaTextEl) {
      const ctaContainer = document.createElement('div');
      ctaContainer.classList.add('cta-container');
      const link = document.createElement('a');
      link.href = ctaLinkEl ? ctaLinkEl.href : '#';
      link.textContent = ctaTextEl ? ctaTextEl.textContent : 'Learn More';
      ctaContainer.append(link);
      slide.append(ctaContainer);

      if (ctaLinkEl) moveInstrumentation(ctaLinkEl, link);
      if (ctaTextEl) moveInstrumentation(ctaTextEl, link);
    }

    slidesContainer.append(slide);
    moveInstrumentation(itemNode, slide);
  });

  carouselWrapper.append(slidesContainer);

  const buttons = document.createElement('div');
  buttons.classList.add('carousel-buttons');

  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-prev');
  prevButton.textContent = 'Previous';

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-next');
  nextButton.textContent = 'Next';

  buttons.append(prevButton, nextButton);
  carouselWrapper.append(buttons);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = 'carousel block';
  block.dataset.blockStatus = 'loaded';
}
