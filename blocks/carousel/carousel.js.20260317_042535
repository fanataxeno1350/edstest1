import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselItems = block.querySelectorAll('[data-aue-model="carouselItem"]');

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('position-relative');

  const carouselPrimarySwiper = document.createElement('div');
  carouselPrimarySwiper.classList.add('carousel-primary-swiper', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  carouselPrimarySwiper.setAttribute('role', 'group');
  carouselPrimarySwiper.setAttribute('aria-live', 'polite');
  carouselPrimarySwiper.setAttribute('aria-roledescription', 'carousel');

  const carouselSwiperWrapper = document.createElement('div');
  carouselSwiperWrapper.classList.add('carousel-swiper-wrapper', 'carousel-primary-swiper-wrapper', 'z-0');

  carouselItems.forEach((itemNode) => {
    const slideDiv = document.createElement('div');
    slideDiv.classList.add('carousel-swiper-slide', 'carousel-primary-swiper-slide');
    slideDiv.setAttribute('role', 'tabpanel');
    slideDiv.setAttribute('aria-roledescription', 'slide');

    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('banner');

    const section = document.createElement('section');
    section.classList.add('banner-section');

    const wrapperInnerDiv = document.createElement('div');
    wrapperInnerDiv.classList.add('position-relative', 'boing', 'banner-section__wrapper');

    const videoElement = itemNode.querySelector('[data-aue-prop="video"]');
    const imageElement = itemNode.querySelector('[data-aue-prop="image"]');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('video-wrapper');

      const video = document.createElement('video');
      video.classList.add('w-100', 'object-fit-cover', 'banner-media', 'banner-video');
      video.setAttribute('title', 'Video');
      video.setAttribute('aria-label', 'Video');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('muted', 'true');
      video.setAttribute('autoplay', 'true');

      const source = document.createElement('source');
      source.setAttribute('src', videoElement.textContent.trim());
      source.setAttribute('type', 'video/mp4');
      video.append(source);
      videoWrapper.append(video);

      const videoControls = document.createElement('div');
      videoControls.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');
      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      videoControls.append(playButton, pauseButton);
      videoWrapper.append(videoControls);

      const muteControls = document.createElement('div');
      muteControls.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');
      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      muteControls.append(muteButton, unmuteButton, noAudioButton);
      videoWrapper.append(muteControls);

      wrapperInnerDiv.append(videoWrapper);
      moveInstrumentation(videoElement, videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      picture.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'banner-image');
      wrapperInnerDiv.append(picture);
      moveInstrumentation(imageElement, picture);
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('banner-cta');

    const ctaLink = itemNode.querySelector('[data-aue-prop="ctaLink"]');
    if (ctaLink) {
      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('text-center');

      const link = document.createElement('a');
      link.classList.add('cmp-button', 'analytics_cta_click', 'text-center', 'cta-layout');
      link.setAttribute('data-link-region', 'CTA');
      link.setAttribute('data-is-internal', 'true');
      link.setAttribute('data-enable-gating', 'false');
      link.setAttribute('href', ctaLink.querySelector('a')?.href || '#');
      link.setAttribute('target', '_blank');

      const span = document.createElement('span');
      span.classList.add('cmp-button__text', 'primary-btn', 'w-75', 'p-5', 'rounded-pill', 'd-inline-flex', 'justify-content-center', 'align-items-center', 'famlf-cta-btn');
      span.textContent = ctaLink.querySelector('a')?.textContent.trim() || '';
      link.append(span);

      const popUpDiv = document.createElement('div');
      popUpDiv.classList.add('pop-up', 'd-none');
      popUpDiv.append(document.createElement('input'), document.createElement('input'), document.createElement('input'), document.createElement('input'));
      popUpDiv.querySelectorAll('input').forEach((input) => input.setAttribute('type', 'hidden'));
      popUpDiv.querySelector(':nth-child(1)').classList.add('popup-message');
      popUpDiv.querySelector(':nth-child(2)').classList.add('proceed-button-label');
      popUpDiv.querySelector(':nth-child(3)').classList.add('cancel-button-label');
      popUpDiv.querySelector(':nth-child(4)').classList.add('background-color');

      textCenterDiv.append(link, popUpDiv);
      bannerCta.append(textCenterDiv);
      moveInstrumentation(ctaLink, bannerCta);
    }

    ctaWrapper.append(bannerCta);
    wrapperInnerDiv.append(ctaWrapper);

    section.append(wrapperInnerDiv);
    bannerDiv.append(section);
    slideDiv.append(bannerDiv);

    carouselSwiperWrapper.append(slideDiv);
    moveInstrumentation(itemNode, slideDiv);
  });

  carouselPrimarySwiper.append(carouselSwiperWrapper);

  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('cmp-carousel__actions');
  const prevButton = document.createElement('button');
  prevButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--previous');
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Previous</span>';
  const nextButton = document.createElement('button');
  nextButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--next');
  nextButton.setAttribute('type', 'button');
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Next</span>';
  const pauseButton = document.createElement('button');
  pauseButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--pause');
  pauseButton.setAttribute('type', 'button');
  pauseButton.setAttribute('aria-label', 'Pause');
  pauseButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Pause</span>';
  const playButton = document.createElement('button');
  playButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--play', 'cmp-carousel__action--disabled');
  playButton.setAttribute('type', 'button');
  playButton.setAttribute('aria-label', 'Play');
  playButton.setAttribute('disabled', '');
  playButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Play</span>';
  actionsDiv.append(prevButton, nextButton, pauseButton, playButton);
  carouselPrimarySwiper.append(actionsDiv);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper-container');
  const nextBtnWrapper = document.createElement('div');
  const nextBtn = document.createElement('button');
  nextBtn.classList.add('carousel-primary-swiper__buttonNext', 'position-absolute', 'top-50', 'swiper-buttonBg', 'd-none', 'd-sm-block', 'cursor-pointer', 'analytics_cta_click', 'disabled');
  nextBtn.setAttribute('disabled', '');
  nextBtnWrapper.append(nextBtn);
  const prevBtnWrapper = document.createElement('div');
  const prevBtn = document.createElement('button');
  prevBtn.classList.add('carousel-primary-swiper__buttonPrev', 'position-absolute', 'top-50', 'swiper-buttonBg', 'd-none', 'd-sm-block', 'cursor-pointer', 'analytics_cta_click');
  prevBtnWrapper.append(prevBtn);
  swiperContainer.append(nextBtnWrapper, prevBtnWrapper);
  carouselPrimarySwiper.append(swiperContainer);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('carousel-swiper-pagination', 'carousel-primary-swiper-pagination', 'pagination-set', 'mb-md-8', 'mb-10', 'mt-6', 'position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  // Add placeholder bullets as they are dynamically generated by Swiper.js
  paginationDiv.innerHTML = '<span class="swiper-pagination-bullet"></span><span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>';
  carouselPrimarySwiper.append(paginationDiv);

  wrapperDiv.append(carouselPrimarySwiper);

  block.textContent = '';
  block.append(wrapperDiv);
  block.className = `carousel block`;
  block.dataset.blockStatus = 'loaded';
}
