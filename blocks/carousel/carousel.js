import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('carousel-slides-container');

  const items = block.querySelectorAll('[data-aue-model="carouselItem"]');

  items.forEach((itemNode) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');

    const videoElement = itemNode.querySelector('[data-aue-prop="video"]');
    const imageElement = itemNode.querySelector('[data-aue-prop="image"]');
    const ctaLinkElement = itemNode.querySelector('[data-aue-prop="ctaLink"]');
    const ctaLabelElement = itemNode.querySelector('[data-aue-prop="ctaLabel"]') || itemNode.querySelector('.carousel-cmp-button__text');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');
      const video = document.createElement('video');
      video.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      video.setAttribute('title', 'Video');
      video.setAttribute('aria-label', 'Video');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('loop', 'false');
      video.setAttribute('muted', 'true');
      video.setAttribute('autoplay', 'true');

      const source = document.createElement('source');
      source.src = videoElement.getAttribute('href') || videoElement.textContent.trim();
      source.type = 'video/mp4';
      video.append(source);
      videoWrapper.append(video);
      moveInstrumentation(videoElement, videoWrapper);

      // Add play/pause and mute/unmute buttons if they exist in the authored HTML
      const playPauseContainer = itemNode.querySelector('.carousel-position-absolute.carousel-w-100.carousel-h-100');
      if (playPauseContainer) {
        videoWrapper.append(playPauseContainer);
        moveInstrumentation(playPauseContainer, videoWrapper);
      }

      const muteUnmuteContainer = itemNode.querySelector('.carousel-position-absolute.carousel-z-2');
      if (muteUnmuteContainer) {
        videoWrapper.append(muteUnmuteContainer);
        moveInstrumentation(muteUnmuteContainer, videoWrapper);
      }

      slide.append(videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      picture.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
      picture.querySelector('img').setAttribute('loading', 'eager');
      picture.querySelector('img').setAttribute('fetchpriority', 'high');
      picture.querySelector('img').setAttribute('decoding', 'async');
      slide.append(picture);
      moveInstrumentation(imageElement, picture);
    }

    if (ctaLinkElement || ctaLabelElement) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

      const ctaDiv = document.createElement('div');
      ctaDiv.classList.add('carousel-banner-cta');

      const linkContainer = document.createElement('div');
      linkContainer.classList.add('carousel-text-center');

      const link = document.createElement('a');
      link.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      link.setAttribute('data-link-region', 'CTA');
      link.setAttribute('data-is-internal', 'true');
      link.setAttribute('data-enable-gating', 'false');

      if (ctaLinkElement) {
        link.href = ctaLinkElement.href;
        if (ctaLinkElement.target) {
          link.target = ctaLinkElement.target;
        }
        moveInstrumentation(ctaLinkElement, link);
      } else if (ctaLabelElement && ctaLabelElement.closest('a')) {
        const authoredLink = ctaLabelElement.closest('a');
        link.href = authoredLink.href;
        if (authoredLink.target) {
          link.target = authoredLink.target;
        }
        moveInstrumentation(authoredLink, link);
      }

      const span = document.createElement('span');
      span.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      span.textContent = ctaLabelElement ? ctaLabelElement.textContent.trim() : 'Learn More';
      if (ctaLabelElement) {
        moveInstrumentation(ctaLabelElement, span);
      }
      link.append(span);
      linkContainer.append(link);
      ctaDiv.append(linkContainer);
      ctaWrapper.append(ctaDiv);
      slide.append(ctaWrapper);
    }

    slidesContainer.append(slide);
    moveInstrumentation(itemNode, slide);
  });

  carouselWrapper.append(slidesContainer);

  // Add navigation buttons and pagination
  const navButtons = document.createElement('div');
  navButtons.classList.add('carousel-navigation');

  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-prev');
  prevButton.textContent = 'Previous';
  navButtons.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-next');
  nextButton.textContent = 'Next';
  navButtons.append(nextButton);

  carouselWrapper.append(navButtons);

  const pagination = document.createElement('div');
  pagination.classList.add('carousel-pagination');
  carouselWrapper.append(pagination);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
