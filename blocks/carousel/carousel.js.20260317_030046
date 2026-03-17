import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  const carouselItems = block.querySelectorAll('[data-aue-model="carouselItem"]');
  carouselItems.forEach((itemNode) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');

    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('banner');

    const bannerSection = document.createElement('section');
    bannerSection.classList.add('banner-section');

    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('position-relative', 'boing', 'banner-section__wrapper');

    const videoElement = itemNode.querySelector('[data-aue-prop="video"]');
    const imageElement = itemNode.querySelector('[data-aue-prop="image"]');
    const ctaLinkElement = itemNode.querySelector('[data-aue-prop="ctaLink"]');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('banner-video-wrapper');

      const video = document.createElement('video');
      video.classList.add('w-100', 'object-fit-cover', 'banner-media', 'banner-video');
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
      source.setAttribute('src', videoElement.src);
      source.setAttribute('type', 'video/mp4');
      video.append(source);

      videoWrapper.append(video);
      moveInstrumentation(videoElement, videoWrapper);

      // Add play/pause and mute/unmute buttons if needed (from authored HTML)
      const playPauseWrapper = document.createElement('div');
      playPauseWrapper.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');
      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('d-none', 'banner-video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      playButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773737595348.svg+xml'; // Placeholder, replace with actual SVG or icon
      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('d-block', 'banner-video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      pauseButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773737595402.svg+xml'; // Placeholder
      playPauseWrapper.append(playButton, pauseButton);
      videoWrapper.append(playPauseWrapper);

      const muteUnmuteWrapper = document.createElement('div');
      muteUnmuteWrapper.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'banner-mute-icon');
      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('banner-video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      muteButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773737595555.svg+xml'; // Placeholder
      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('banner-video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      unmuteButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773737595698.svg+xml'; // Placeholder
      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('banner-video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      noAudioButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773737595750.svg+xml'; // Placeholder
      muteUnmuteWrapper.append(muteButton, unmuteButton, noAudioButton);
      videoWrapper.append(muteUnmuteWrapper);

      wrapperDiv.append(videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      picture.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'banner-image');
      picture.querySelector('img').setAttribute('loading', 'eager');
      picture.querySelector('img').setAttribute('fetchpriority', 'high');
      picture.querySelector('img').setAttribute('decoding', 'async');
      wrapperDiv.append(picture);
      moveInstrumentation(imageElement, picture);
    }

    if (ctaLinkElement) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');
      const bannerCtaDiv = document.createElement('div');
      bannerCtaDiv.classList.add('banner-cta');

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('text-center');

      const link = document.createElement('a');
      link.classList.add('cmp-button', 'analytics_cta_click', 'text-center', 'cta-layout');
      link.setAttribute('data-link-region', 'CTA');
      link.setAttribute('data-is-internal', 'true');
      link.setAttribute('data-enable-gating', 'false');
      link.href = ctaLinkElement.href;
      if (ctaLinkElement.target) {
        link.setAttribute('target', ctaLinkElement.target);
      }

      const span = document.createElement('span');
      span.classList.add('cmp-button__text', 'primary-btn', 'w-75', 'p-5', 'rounded-pill', 'd-inline-flex', 'justify-content-center', 'align-items-center', 'famlf-cta-btn');
      span.textContent = ctaLinkElement.textContent.trim();

      link.append(span);
      textCenterDiv.append(link);

      const popupDiv = document.createElement('div');
      popupDiv.classList.add('pop-up', 'd-none');
      popupDiv.innerHTML = `
        <input type="hidden" class="popup-message">
        <input type="hidden" class="proceed-button-label">
        <input type="hidden" class="cancel-button-label">
        <input type="hidden" class="background-color">
      `;
      textCenterDiv.append(popupDiv);

      bannerCtaDiv.append(textCenterDiv);
      ctaWrapper.append(bannerCtaDiv);
      wrapperDiv.append(ctaWrapper);
      moveInstrumentation(ctaLinkElement, ctaWrapper);
    }

    bannerSection.append(wrapperDiv);
    bannerDiv.append(bannerSection);
    swiperSlide.append(bannerDiv);
    swiperWrapper.append(swiperSlide);
    moveInstrumentation(itemNode, swiperSlide);
  });

  block.textContent = '';

  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative');

  const swiperDiv = document.createElement('div');
  swiperDiv.classList.add('swiper', 'carousel-primary-swiper', 'carousel-primary-swiper-carousel-419d8524f7'); // Add dynamic class if needed
  swiperDiv.setAttribute('id', 'carousel-419d8524f7'); // Add dynamic ID if needed
  swiperDiv.setAttribute('role', 'group');
  swiperDiv.setAttribute('aria-live', 'polite');
  swiperDiv.setAttribute('aria-roledescription', 'carousel');
  swiperDiv.setAttribute('data-is-autoplay', 'true');
  swiperDiv.setAttribute('data-delay', '5000');
  swiperDiv.setAttribute('data-autopause-disabled', 'true');
  swiperDiv.setAttribute('data-is-loop', 'false');
  swiperDiv.setAttribute('data-placeholder-text', 'false');

  swiperDiv.append(swiperWrapper);

  // Add navigation and pagination elements
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('cmp-carousel__actions');
  actionsDiv.innerHTML = `
    <button class="cmp-carousel__action cmp-carousel__action--previous" type="button" aria-label="Previous" data-cmp-hook-carousel="previous">
        <span class="cmp-carousel__action-icon"></span>
        <span class="cmp-carousel__action-text">Previous</span>
    </button>
    <button class="cmp-carousel__action cmp-carousel__action--next" type="button" aria-label="Next" data-cmp-hook-carousel="next">
        <span class="cmp-carousel__action-icon"></span>
        <span class="cmp-carousel__action-text">Next</span>
    </button>
    <button class="cmp-carousel__action cmp-carousel__action--pause" type="button" aria-label="Pause" data-cmp-hook-carousel="pause">
        <span class="cmp-carousel__action-icon"></span>
        <span class="cmp-carousel__action-text">Pause</span>
    </button>
    <button class="cmp-carousel__action cmp-carousel__action--play cmp-carousel__action--disabled" type="button" aria-label="Play" data-cmp-hook-carousel="play" disabled="">
        <span class="cmp-carousel__action-icon"></span>
        <span class="cmp-carousel__action-text">Play</span>
    </button>
  `;
  swiperDiv.append(actionsDiv);

  const carouselSwiperContainer = document.createElement('div');
  carouselSwiperContainer.classList.add('carousel-swiper-container');
  carouselSwiperContainer.innerHTML = `
    <div>
        <button class="carousel-primary-swiper__buttonNext position-absolute top-50 swiper-buttonBg d-none d-sm-block cursor-pointer analytics_cta_click disabled" disabled="">
            /content/dam/aemigrate/uploaded-folder/image/1773737595799.svg+xml
        </button>
    </div>
    <div>
        <button class="carousel-primary-swiper__buttonPrev position-absolute top-50 swiper-buttonBg d-none d-sm-block cursor-pointer analytics_cta_click">
            /content/dam/aemigrate/uploaded-folder/image/1773737595859.svg+xml
        </button>
    </div>
  `;
  swiperDiv.append(carouselSwiperContainer);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'pagination-set', 'mb-md-8', 'mb-10', 'mt-6', 'position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  paginationDiv.innerHTML = `<span class="swiper-pagination-bullet"></span><span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>`; // Placeholder, actual pagination will be handled by Swiper JS
  swiperDiv.append(paginationDiv);

  positionRelativeDiv.append(swiperDiv);
  block.append(positionRelativeDiv);

  block.className = `carousel block`;
  block.dataset.blockStatus = 'loaded';
}
