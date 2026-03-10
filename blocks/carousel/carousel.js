import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('carousel-swiper-wrapper');

  // Transfer top-level instrumentation from the block to the new wrapper
  moveInstrumentation(block, carouselWrapper);

  [...block.children].forEach((row) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-swiper-slide');
    moveInstrumentation(row, slide);

    const videoSrc = row.querySelector('video source');
    const image = row.querySelector('img');
    const ctaLink = row.querySelector('a');

    const bannerSection = document.createElement('section');
    bannerSection.classList.add('carousel-banner-section');

    const bannerWrapper = document.createElement('div');
    bannerWrapper.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    if (videoSrc) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');

      const videoElement = document.createElement('video');
      videoElement.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      videoElement.setAttribute('title', 'Video');
      videoElement.setAttribute('aria-label', 'Video');
      videoElement.setAttribute('data-is-autoplay', 'true');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('preload', 'metadata');
      videoElement.setAttribute('fetchpriority', 'high');
      videoElement.setAttribute('loop', 'false');
      videoElement.setAttribute('muted', 'true');
      videoElement.setAttribute('autoplay', 'true');

      const sourceElement = document.createElement('source');
      sourceElement.src = videoSrc.src;
      sourceElement.type = videoSrc.type;
      videoElement.append(sourceElement);
      videoWrapper.append(videoElement);

      // Add play/pause and mute/unmute buttons if they exist in the original HTML
      const playPauseContainer = row.querySelector('.carousel-position-absolute.carousel-w-100.carousel-h-100.carousel-start-0.carousel-top-0');
      if (playPauseContainer) {
        videoWrapper.append(playPauseContainer.cloneNode(true));
      }
      const muteIconContainer = row.querySelector('.carousel-position-absolute.carousel-z-2');
      if (muteIconContainer) {
        videoWrapper.append(muteIconContainer.cloneNode(true));
      }

      bannerWrapper.append(videoWrapper);
    } else if (image) {
      const optimizedPic = createOptimizedPicture(image.src, image.alt);
      moveInstrumentation(image, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
      optimizedPic.querySelector('img').setAttribute('loading', 'eager');
      optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
      optimizedPic.querySelector('img').setAttribute('decoding', 'async');
      bannerWrapper.append(optimizedPic);
    }

    if (ctaLink) {
      const ctaContainer = document.createElement('div');
      ctaContainer.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

      const bannerCta = document.createElement('div');
      bannerCta.classList.add('carousel-banner-cta');

      const textCenter = document.createElement('div');
      textCenter.classList.add('carousel-text-center');

      const newCta = document.createElement('a');
      newCta.id = ctaLink.id || '';
      newCta.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      newCta.setAttribute('data-link-region', 'CTA');
      newCta.setAttribute('data-is-internal', 'true');
      newCta.setAttribute('data-enable-gating', 'false');
      newCta.href = ctaLink.href;
      newCta.target = ctaLink.target;

      const ctaTextSpan = document.createElement('span');
      ctaTextSpan.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      ctaTextSpan.textContent = ctaLink.textContent.trim();
      newCta.append(ctaTextSpan);
      textCenter.append(newCta);

      // Re-add the pop-up div if it exists
      const popUpDiv = row.querySelector('.carousel-pop-up');
      if (popUpDiv) {
        textCenter.append(popUpDiv.cloneNode(true));
      }

      bannerCta.append(textCenter);
      ctaContainer.append(bannerCta);
      bannerWrapper.append(ctaContainer);
    }

    bannerSection.append(bannerWrapper);
    slide.append(bannerSection);
    swiperWrapper.append(slide);
  });

  carouselWrapper.append(swiperWrapper);

  // Add navigation and pagination elements from the original HTML if they exist
  const actions = block.querySelector('.carousel-cmp-carousel__actions');
  if (actions) {
    carouselWrapper.append(actions.cloneNode(true));
  }

  const swiperContainer = block.querySelector('.carousel-swiper-container');
  if (swiperContainer) {
    carouselWrapper.append(swiperContainer.cloneNode(true));
  }

  const pagination = block.querySelector('.carousel-swiper-pagination');
  if (pagination) {
    carouselWrapper.append(pagination.cloneNode(true));
  }

  block.textContent = '';
  block.append(carouselWrapper);
}
