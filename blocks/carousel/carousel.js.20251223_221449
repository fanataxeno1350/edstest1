import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.className = 'carousel-wrapper';

  const swiperCarouselPrimary = document.createElement('div');
  swiperCarouselPrimary.className = 'swiper carousel-primary-swiper carousel-primary-swiper-419d8524f7 swiper-initialized swiper-horizontal swiper-backface-hidden';
  swiperCarouselPrimary.setAttribute('data-swiper-id', '.carousel-primary-swiper-419d8524f7');
  swiperCarouselPrimary.id = 'carousel-419d8524f7';
  swiperCarouselPrimary.setAttribute('role', 'group');
  swiperCarouselPrimary.setAttribute('aria-live', 'polite');
  swiperCarouselPrimary.setAttribute('aria-roledescription', 'carousel');
  swiperCarouselPrimary.setAttribute('data-is-autoplay', 'true');
  swiperCarouselPrimary.setAttribute('data-delay', '5000');
  swiperCarouselPrimary.setAttribute('data-autopause-disabled', 'true');
  swiperCarouselPrimary.setAttribute('data-is-loop', 'false');
  swiperCarouselPrimary.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper carousel-primary-swiper-wrapper carousel-z-0';

  const slides = block.querySelectorAll('[data-aue-model="carousel-slide"]');
  slides.forEach((slide, index) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    swiperSlide.className = `swiper-slide carousel-primary-swiper-slide${index === 0 ? ' carousel-cmp-carousel__item--active swiper-slide-prev' : ''}`;

    const carouselBanner = document.createElement('div');
    carouselBanner.className = 'carousel-banner';

    const carouselBannerSection = document.createElement('section');
    carouselBannerSection.className = 'carousel-banner-section';

    const positionRelativeWrapper = document.createElement('div');
    positionRelativeWrapper.className = 'position-relative carousel-boing carousel-banner-section__wrapper';

    const videoField = slide.querySelector('[data-aue-prop="video"]');
    const imageField = slide.querySelector('[data-aue-prop="image"]');
    const ctaLinkField = slide.querySelector('[data-aue-prop="ctaLink"]');
    const ctaTextField = slide.querySelector('[data-aue-prop="ctaText"]');

    if (videoField) {
      const carouselVideoWrapper = document.createElement('div');
      carouselVideoWrapper.className = 'carousel-video-wrapper';

      const videoElement = document.createElement('video');
      videoElement.className = 'w-100 object-fit-cover carousel-banner-media carousel-banner-video';
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
      sourceElement.src = videoField.textContent.trim();
      sourceElement.type = 'video/mp4';
      videoElement.append(sourceElement);
      carouselVideoWrapper.append(videoElement);
      moveInstrumentation(videoField, videoElement);

      const playPauseWrapper = document.createElement('div');
      playPauseWrapper.className = 'position-absolute w-100 h-100 start-0 top-0 d-flex justify-content-center align-items-center cursor-pointer';

      const playButton = document.createElement('button');
      playButton.type = 'button';
      playButton.className = 'd-none carousel-video-icon icon-play bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
      playPauseWrapper.append(playButton);

      const pauseButton = document.createElement('button');
      pauseButton.type = 'button';
      pauseButton.className = 'd-block carousel-video-icon icon-pause bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
      playPauseWrapper.append(pauseButton);
      carouselVideoWrapper.append(playPauseWrapper);

      const muteIconWrapper = document.createElement('div');
      muteIconWrapper.className = 'position-absolute carousel-z-2 d-flex justify-content-center align-items-center cursor-pointer carousel-mute-icon';

      const muteButton = document.createElement('button');
      muteButton.type = 'button';
      muteButton.className = 'carousel-video-icon-volume icon-mute bg-transparent d-flex align-items-center justify-content-center cursor-pointer d-none';
      muteIconWrapper.append(muteButton);

      const unmuteButton = document.createElement('button');
      unmuteButton.type = 'button';
      unmuteButton.className = 'carousel-video-icon-volume icon-unmute bg-transparent d-flex align-items-center justify-content-center cursor-pointer d-none';
      muteIconWrapper.append(unmuteButton);

      const noAudioButton = document.createElement('button');
      noAudioButton.type = 'button';
      noAudioButton.className = 'carousel-video-icon-volume carousel-no-audio-icon bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
      muteIconWrapper.append(noAudioButton);
      carouselVideoWrapper.append(muteIconWrapper);

      positionRelativeWrapper.append(carouselVideoWrapper);
    } else if (imageField) {
      const img = imageField.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, true, [{ width: '2000' }]);
        picture.querySelector('img').className = 'w-100 h-100 object-fit-cover carousel-banner-media carousel-banner-image';
        positionRelativeWrapper.append(picture);
        moveInstrumentation(imageField, picture);
      }
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'position-absolute start-50 translate-middle-x w-100 carousel-boing__banner--cta';

    const carouselBannerCta = document.createElement('div');
    carouselBannerCta.className = 'carousel-banner-cta';

    if (ctaLinkField && ctaTextField) {
      const textCenterDiv = document.createElement('div');
      textCenterDiv.className = 'text-center';

      const anchor = document.createElement('a');
      anchor.id = `cta-${Math.random().toString(36).substring(2, 11)}`;
      anchor.className = 'carousel-cmp-button analytics_cta_click text-center carousel-cta-layout';
      anchor.setAttribute('data-link-region', 'CTA');
      anchor.setAttribute('data-is-internal', 'true');
      anchor.setAttribute('data-enable-gating', 'false');
      anchor.href = ctaLinkField.textContent.trim();
      anchor.target = '_blank';

      const spanText = document.createElement('span');
      spanText.className = 'carousel-cmp-button__text carousel-primary-btn w-75 p-5 rounded-pill d-inline-flex justify-content-center align-items-center carousel-famlf-cta-btn';
      spanText.textContent = ctaTextField.textContent.trim();

      anchor.append(spanText);
      textCenterDiv.append(anchor);
      carouselBannerCta.append(textCenterDiv);
      moveInstrumentation(ctaLinkField, anchor);
      moveInstrumentation(ctaTextField, spanText);
    }

    const carouselPopUp = document.createElement('div');
    carouselPopUp.className = 'carousel-pop-up d-none';
    carouselPopUp.innerHTML = `
      <input type="hidden" class="carousel-popup-message">
      <input type="hidden" class="carousel-proceed-button-label">
      <input type="hidden" class="carousel-cancel-button-label">
      <input type="hidden" class="carousel-background-color">
    `;
    carouselBannerCta.append(carouselPopUp);

    ctaWrapper.append(carouselBannerCta);
    positionRelativeWrapper.append(ctaWrapper);

    carouselBannerSection.append(positionRelativeWrapper);
    carouselBanner.append(carouselBannerSection);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
    moveInstrumentation(slide, swiperSlide);
  });

  swiperCarouselPrimary.append(swiperWrapper);

  const carouselActions = document.createElement('div');
  carouselActions.className = 'carousel-cmp-carousel__actions';
  carouselActions.innerHTML = `
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--previous" type="button" aria-label="Previous" data-cmp-hook-carousel="previous">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text">Previous</span>
    </button>
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--next" type="button" aria-label="Next" data-cmp-hook-carousel="next">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text">Next</span>
    </button>
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--pause" type="button" aria-label="Pause" data-cmp-hook-carousel="pause">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text">Pause</span>
    </button>
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--play carousel-cmp-carousel__action--disabled" type="button" aria-label="Play" data-cmp-hook-carousel="play">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text">Play</span>
    </button>
  `;
  swiperWrapper.append(carouselActions);

  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'carousel-swiper-container';
  swiperContainer.innerHTML = `
    <div>
      <button class="carousel-primary-swiper__buttonNext position-absolute top-50 carousel-swiper-buttonBg d-none d-sm-block cursor-pointer analytics_cta_click disabled" disabled="">
        /content/dam/aemigrate/uploaded-folder/image/1765951154031.svg+xml
      </button>
    </div>
    <div>
      <button class="carousel-primary-swiper__buttonPrev position-absolute top-50 carousel-swiper-buttonBg d-none d-sm-block cursor-pointer analytics_cta_click">
        /content/dam/aemigrate/uploaded-folder/image/1765951154061.svg+xml
      </button>
    </div>
  `;
  swiperCarouselPrimary.append(swiperContainer);

  const swiperPagination = document.createElement('div');
  swiperPagination.className = 'swiper-pagination carousel-primary-swiper-pagination carousel-pagination-set mb-md-8 mb-10 mt-6 position-absolute swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal';
  swiperPagination.innerHTML = `
    <span class="swiper-pagination-bullet"></span>
    <span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>
  `;
  swiperCarouselPrimary.append(swiperPagination);

  carouselWrapper.append(swiperCarouselPrimary);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}