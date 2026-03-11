import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.className = 'carousel-swiper carousel-primary-swiper carousel-primary-swiper-carousel-419d8524f7 swiper-initialized swiper-horizontal swiper-backface-hidden';
  carouselWrapper.setAttribute('data-swiper-id', '.carousel-primary-swiper-carousel-419d8524f7');
  carouselWrapper.id = 'carousel-419d8524f7';
  carouselWrapper.setAttribute('role', 'group');
  carouselWrapper.setAttribute('aria-live', 'polite');
  carouselWrapper.setAttribute('aria-roledescription', 'carousel');
  carouselWrapper.setAttribute('data-is-autoplay', 'true');
  carouselWrapper.setAttribute('data-delay', '5000');
  carouselWrapper.setAttribute('data-autopause-disabled', 'true');
  carouselWrapper.setAttribute('data-is-loop', 'false');
  carouselWrapper.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'carousel-swiper-wrapper carousel-primary-swiper-wrapper carousel-z-0';
  carouselWrapper.append(swiperWrapper);

  const items = block.querySelectorAll('[data-aue-model="carouselItem"]');
  items.forEach((itemNode) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'carousel-swiper-slide carousel-primary-swiper-slide';
    slideDiv.setAttribute('role', 'tabpanel');
    slideDiv.setAttribute('aria-roledescription', 'slide');

    const section = document.createElement('section');
    section.className = 'banner-section';

    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'carousel-position-relative carousel-boing banner-section__wrapper';

    const videoElement = itemNode.querySelector('[data-aue-prop="video"]');
    const imageElement = itemNode.querySelector('[data-aue-prop="image"]');
    const ctaLinkElement = itemNode.querySelector('[data-aue-prop="ctaLink"]');
    const ctaLabelElement = itemNode.querySelector('[data-aue-prop="ctaLabel"]');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'banner-video-wrapper';

      const video = document.createElement('video');
      video.className = 'carousel-w-100 carousel-object-fit-cover banner-media banner-video';
      video.setAttribute('title', 'Video');
      video.setAttribute('aria-label', 'Video');
      video.setAttribute('data-is-autoplay', 'true');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('loop', 'false');
      video.setAttribute('muted', 'true');
      video.setAttribute('autoplay', 'true');

      const source = document.createElement('source');
      source.src = videoElement.href || videoElement.textContent.trim();
      source.type = 'video/mp4';
      video.append(source);
      videoWrapper.append(video);
      moveInstrumentation(videoElement, video);

      const controlsWrapper = document.createElement('div');
      controlsWrapper.className = 'carousel-position-absolute carousel-w-100 carousel-h-100 carousel-start-0 carousel-top-0 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer';

      const playButton = document.createElement('button');
      playButton.type = 'button';
      playButton.className = 'carousel-d-none banner-video-icon banner-icon-play carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      // Assuming the SVG content is directly in the button's text content for now
      playButton.innerHTML = itemNode.querySelector('.banner-icon-play')?.innerHTML || '';

      const pauseButton = document.createElement('button');
      pauseButton.type = 'button';
      pauseButton.className = 'carousel-d-block banner-video-icon banner-icon-pause carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      pauseButton.innerHTML = itemNode.querySelector('.banner-icon-pause')?.innerHTML || '';

      controlsWrapper.append(playButton, pauseButton);
      videoWrapper.append(controlsWrapper);

      const muteIconWrapper = document.createElement('div');
      muteIconWrapper.className = 'carousel-position-absolute carousel-z-2 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer banner-mute-icon';

      const muteButton = document.createElement('button');
      muteButton.type = 'button';
      muteButton.className = 'banner-video-icon-volume banner-icon-mute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none';
      muteButton.innerHTML = itemNode.querySelector('.banner-icon-mute')?.innerHTML || '';

      const unmuteButton = document.createElement('button');
      unmuteButton.type = 'button';
      unmuteButton.className = 'banner-video-icon-volume banner-icon-unmute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none';
      unmuteButton.innerHTML = itemNode.querySelector('.banner-icon-unmute')?.innerHTML || '';

      const noAudioButton = document.createElement('button');
      noAudioButton.type = 'button';
      noAudioButton.className = 'banner-video-icon-volume banner-no-audio-icon carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      noAudioButton.innerHTML = itemNode.querySelector('.banner-no-audio-icon')?.innerHTML || '';

      muteIconWrapper.append(muteButton, unmuteButton, noAudioButton);
      videoWrapper.append(muteIconWrapper);

      wrapperDiv.append(videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      picture.querySelector('img').className = 'carousel-w-100 carousel-h-100 carousel-object-fit-cover banner-media banner-image';
      picture.querySelector('img').setAttribute('loading', 'eager');
      picture.querySelector('img').setAttribute('fetchpriority', 'high');
      picture.querySelector('img').setAttribute('decoding', 'async');
      wrapperDiv.append(picture);
      moveInstrumentation(imageElement, picture);
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'carousel-position-absolute carousel-start-50 carousel-translate-middle-x carousel-w-100 carousel-boing__banner--cta';

    const bannerCta = document.createElement('div');
    bannerCta.className = 'banner-cta';

    if (ctaLinkElement && ctaLabelElement) {
      const ctaContainer = document.createElement('div');
      ctaContainer.className = 'carousel-text-center';

      const ctaLink = document.createElement('a');
      ctaLink.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
      ctaLink.className = 'cmp-button carousel-analytics_cta_click carousel-text-center carousel-cta-layout';
      ctaLink.setAttribute('data-link-region', 'CTA');
      ctaLink.setAttribute('data-is-internal', 'true');
      ctaLink.setAttribute('data-enable-gating', 'false');
      ctaLink.href = ctaLinkElement.href || ctaLinkElement.textContent.trim();
      ctaLink.target = '_blank';

      const ctaSpan = document.createElement('span');
      ctaSpan.className = 'cmp-button__text carousel-primary-btn carousel-w-75 carousel-p-5 carousel-rounded-pill carousel-d-inline-flex carousel-justify-content-center carousel-align-items-center carousel-famlf-cta-btn';
      ctaSpan.textContent = ctaLabelElement.textContent.trim();
      ctaLink.append(ctaSpan);
      ctaContainer.append(ctaLink);
      moveInstrumentation(ctaLinkElement, ctaLink);
      moveInstrumentation(ctaLabelElement, ctaSpan);

      const popupDiv = document.createElement('div');
      popupDiv.className = 'carousel-pop-up carousel-d-none';
      popupDiv.innerHTML = '<input type="hidden" class="carousel-popup-message"><input type="hidden" class="carousel-proceed-button-label"><input type="hidden" class="carousel-cancel-button-label"><input type="hidden" class="carousel-background-color">';
      ctaContainer.append(popupDiv);
      bannerCta.append(ctaContainer);
    }

    ctaWrapper.append(bannerCta);
    wrapperDiv.append(ctaWrapper);
    section.append(wrapperDiv);
    slideDiv.append(section);
    swiperWrapper.append(slideDiv);
    moveInstrumentation(itemNode, slideDiv);
  });

  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'cmp-carousel__actions';

  const prevButton = document.createElement('button');
  prevButton.className = 'cmp-carousel__action cmp-carousel__action--previous';
  prevButton.type = 'button';
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.setAttribute('data-cmp-hook-carousel', 'previous');
  prevButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Previous</span>';

  const nextButton = document.createElement('button');
  nextButton.className = 'cmp-carousel__action cmp-carousel__action--next';
  nextButton.type = 'button';
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.setAttribute('data-cmp-hook-carousel', 'next');
  nextButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Next</span>';

  const pauseButton = document.createElement('button');
  pauseButton.className = 'cmp-carousel__action cmp-carousel__action--pause';
  pauseButton.type = 'button';
  pauseButton.setAttribute('aria-label', 'Pause');
  pauseButton.setAttribute('data-cmp-hook-carousel', 'pause');
  pauseButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Pause</span>';

  const playButton = document.createElement('button');
  playButton.className = 'cmp-carousel__action cmp-carousel__action--play cmp-carousel__action--disabled';
  playButton.type = 'button';
  playButton.setAttribute('aria-label', 'Play');
  playButton.setAttribute('data-cmp-hook-carousel', 'play');
  playButton.setAttribute('disabled', '');
  playButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Play</span>';

  actionsDiv.append(prevButton, nextButton, pauseButton, playButton);
  swiperWrapper.append(actionsDiv);

  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'carousel-swiper-container';

  const nextButtonWrapper = document.createElement('div');
  const nextSwiperButton = document.createElement('button');
  nextSwiperButton.className = 'carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click carousel-disabled';
  nextSwiperButton.setAttribute('disabled', '');
  nextSwiperButton.innerHTML = itemNode.querySelector('.carousel-primary-swiper__buttonNext')?.innerHTML || '';
  nextButtonWrapper.append(nextSwiperButton);

  const prevButtonWrapper = document.createElement('div');
  const prevSwiperButton = document.createElement('button');
  prevSwiperButton.className = 'carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click';
  prevSwiperButton.innerHTML = itemNode.querySelector('.carousel-primary-swiper__buttonPrev')?.innerHTML || '';
  prevButtonWrapper.append(prevSwiperButton);

  swiperContainer.append(nextButtonWrapper, prevButtonWrapper);
  carouselWrapper.append(swiperContainer);

  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'carousel-swiper-pagination carousel-primary-swiper-pagination carousel-pagination-set carousel-mb-md-8 carousel-mb-10 carousel-mt-6 carousel-position-absolute carousel-swiper-pagination-clickable carousel-swiper-pagination-bullets carousel-swiper-pagination-horizontal';
  carouselWrapper.append(paginationDiv);

  block.textContent = '';
  block.className = `${block.dataset.blockName} carousel-position-relative`;
  block.append(carouselWrapper);
  block.dataset.blockStatus = 'loaded';
}
