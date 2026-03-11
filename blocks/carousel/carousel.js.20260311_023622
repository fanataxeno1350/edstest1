import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselPositionRelative = document.createElement('div');
  carouselPositionRelative.classList.add('carousel-position-relative');
  moveInstrumentation(block, carouselPositionRelative);

  const carouselSwiper = document.createElement('div');
  carouselSwiper.classList.add('carousel-swiper', 'carousel-primary-swiper', 'carousel-primary-swiper-carousel-419d8524f7', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  carouselSwiper.setAttribute('role', 'group');
  carouselSwiper.setAttribute('aria-live', 'polite');
  carouselSwiper.setAttribute('aria-roledescription', 'carousel');
  carouselSwiper.setAttribute('data-is-autoplay', 'true');
  carouselSwiper.setAttribute('data-delay', '5000');
  carouselSwiper.setAttribute('data-autopause-disabled', 'true');
  carouselSwiper.setAttribute('data-is-loop', 'false');
  carouselSwiper.setAttribute('data-placeholder-text', 'false');

  const carouselSwiperWrapper = document.createElement('div');
  carouselSwiperWrapper.classList.add('carousel-swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  [...block.children].forEach((row) => {
    const carouselSwiperSlide = document.createElement('div');
    carouselSwiperSlide.classList.add('carousel-swiper-slide', 'carousel-primary-swiper-slide');
    carouselSwiperSlide.setAttribute('role', 'tabpanel');
    carouselSwiperSlide.setAttribute('aria-roledescription', 'slide');
    moveInstrumentation(row, carouselSwiperSlide);

    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('banner');
    carouselSwiperSlide.append(bannerDiv);

    const section = document.createElement('section');
    section.classList.add('banner-section');
    bannerDiv.append(section);

    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('carousel-position-relative', 'carousel-boing', 'banner-section__wrapper');
    section.append(wrapperDiv);

    const cells = [...row.children];
    const videoCell = cells[0];
    const imageCell = cells[1];
    const ctaLinkCell = cells[2];
    const ctaTextCell = cells[3];

    let mediaElement = null;
    let mediaWrapper = null;

    const video = videoCell ? videoCell.querySelector('a') : null;
    const image = imageCell ? imageCell.querySelector('img') : null;

    if (video && video.href) {
      mediaWrapper = document.createElement('div');
      mediaWrapper.classList.add('banner-video-wrapper');
      wrapperDiv.append(mediaWrapper);

      mediaElement = document.createElement('video');
      mediaElement.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'banner-media', 'banner-video');
      mediaElement.setAttribute('title', 'Video');
      mediaElement.setAttribute('aria-label', 'Video');
      mediaElement.setAttribute('data-is-autoplay', 'true');
      mediaElement.setAttribute('playsinline', '');
      mediaElement.setAttribute('preload', 'metadata');
      mediaElement.setAttribute('fetchpriority', 'high');
      mediaElement.setAttribute('loop', 'false');
      mediaElement.setAttribute('muted', 'true');
      mediaElement.setAttribute('autoplay', 'true');
      moveInstrumentation(video, mediaElement);

      const source = document.createElement('source');
      source.setAttribute('src', video.href);
      source.setAttribute('type', 'video/mp4');
      mediaElement.append(source);
      mediaWrapper.append(mediaElement);

      const playPauseWrapper = document.createElement('div');
      playPauseWrapper.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');
      mediaWrapper.append(playPauseWrapper);

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('carousel-d-none', 'banner-video-icon', 'banner-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      playPauseWrapper.append(playButton);

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('carousel-d-block', 'banner-video-icon', 'banner-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      playPauseWrapper.append(pauseButton);

      const muteIconWrapper = document.createElement('div');
      muteIconWrapper.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'banner-mute-icon');
      mediaWrapper.append(muteIconWrapper);

      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('banner-video-icon-volume', 'banner-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      muteIconWrapper.append(muteButton);

      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('banner-video-icon-volume', 'banner-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      muteIconWrapper.append(unmuteButton);

      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('banner-video-icon-volume', 'banner-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      muteIconWrapper.append(noAudioButton);

    } else if (image) {
      mediaElement = createOptimizedPicture(image.src, image.alt);
      mediaElement.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'banner-media', 'banner-image');
      mediaElement.querySelector('img').setAttribute('loading', 'eager');
      mediaElement.querySelector('img').setAttribute('fetchpriority', 'high');
      mediaElement.querySelector('img').setAttribute('decoding', 'async');
      moveInstrumentation(image, mediaElement.querySelector('img'));
      wrapperDiv.append(mediaElement);
    } else if (imageCell && imageCell.querySelector('a')) {
      const imgLink = imageCell.querySelector('a');
      mediaElement = createOptimizedPicture(imgLink.href, '');
      mediaElement.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'banner-media', 'banner-image');
      mediaElement.querySelector('img').setAttribute('loading', 'eager');
      mediaElement.querySelector('img').setAttribute('fetchpriority', 'high');
      mediaElement.querySelector('img').setAttribute('decoding', 'async');
      moveInstrumentation(imgLink, mediaElement.querySelector('img'));
      wrapperDiv.append(mediaElement);
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');
    wrapperDiv.append(ctaWrapper);

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('banner-cta');
    ctaWrapper.append(bannerCta);

    const textCenterDiv = document.createElement('div');
    textCenterDiv.classList.add('carousel-text-center');
    bannerCta.append(textCenterDiv);

    const ctaLink = ctaLinkCell ? ctaLinkCell.querySelector('a') : null;
    const ctaText = ctaTextCell ? ctaTextCell.textContent.trim() : '';

    if (ctaLink && ctaText) {
      const anchor = document.createElement('a');
      anchor.classList.add('cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      anchor.setAttribute('data-link-region', 'CTA');
      anchor.setAttribute('data-is-internal', 'true');
      anchor.setAttribute('data-enable-gating', 'false');
      anchor.setAttribute('href', ctaLink.href);
      anchor.setAttribute('target', '_blank');
      moveInstrumentation(ctaLink, anchor);

      const span = document.createElement('span');
      span.classList.add('cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      span.textContent = ctaText;
      moveInstrumentation(ctaTextCell, span);
      anchor.append(span);
      textCenterDiv.append(anchor);

      const popupDiv = document.createElement('div');
      popupDiv.classList.add('carousel-pop-up', 'carousel-d-none');
      popupDiv.innerHTML = `
        <input type="hidden" class="carousel-popup-message">
        <input type="hidden" class="carousel-proceed-button-label">
        <input type="hidden" class="carousel-cancel-button-label">
        <input type="hidden" class="carousel-background-color">
      `;
      textCenterDiv.append(popupDiv);
    }

    carouselSwiperWrapper.append(carouselSwiperSlide);
  });

  carouselSwiper.append(carouselSwiperWrapper);

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
  carouselSwiperWrapper.append(actionsDiv);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('carousel-swiper-container');
  swiperContainer.innerHTML = `
    <div>
        <button class="carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click carousel-disabled" disabled="">
            /content/dam/aemigrate/uploaded-folder/image/1773217200604.svg+xml
        </button>
    </div>
    <div>
        <button class="carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click">
            /content/dam/aemigrate/uploaded-folder/image/1773217200661.svg+xml
        </button>
    </div>
  `;
  carouselSwiper.append(swiperContainer);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('carousel-swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  swiperPagination.innerHTML = '<span class="carousel-swiper-pagination-bullet"></span><span class="carousel-swiper-pagination-bullet carousel-swiper-pagination-bullet-active"></span>';
  carouselSwiper.append(swiperPagination);

  carouselPositionRelative.append(carouselSwiper);
  block.textContent = '';
  block.append(carouselPositionRelative);
}
