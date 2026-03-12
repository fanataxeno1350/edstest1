import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'carousel-container position-relative';

  const swiper = document.createElement('div');
  swiper.className = 'swiper carousel-primary-swiper carousel-primary-swiper-419d8524f7 swiper-initialized swiper-horizontal swiper-backface-hidden';
  swiper.setAttribute('data-swiper-id', '.carousel-primary-swiper-419d8524f7');
  swiper.id = 'carousel-419d8524f7';
  swiper.setAttribute('role', 'group');
  swiper.setAttribute('aria-live', 'polite');
  swiper.setAttribute('aria-roledescription', 'carousel');
  swiper.setAttribute('data-is-autoplay', 'true');
  swiper.setAttribute('data-delay', '5000');
  swiper.setAttribute('data-autopause-disabled', 'true');
  swiper.setAttribute('data-is-loop', 'false');
  swiper.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper carousel-primary-swiper-wrapper carousel-z-0';

  const carouselItems = block.querySelectorAll('[data-aue-model="carouselItem"]');
  carouselItems.forEach((itemNode, index) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.id = `carousel-419d8524f7-item-${index}-tabpanel`;
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-labelledby', `carousel-419d8524f7-item-${index}-tab`);
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    swiperSlide.className = `swiper-slide carousel-primary-swiper-slide ${index === 0 ? 'swiper-slide-prev' : ''} ${index === 1 ? 'swiper-slide-active' : ''}`;

    const bannerComponent = document.createElement('div');
    bannerComponent.className = 'banner-component';

    const bannerSection = document.createElement('section');
    bannerSection.className = 'banner-component-section';

    const bannerWrapper = document.createElement('div');
    bannerWrapper.className = 'position-relative boing banner-component-section__wrapper';

    const videoField = itemNode.querySelector('[data-aue-prop="video"]');
    const imageField = itemNode.querySelector('[data-aue-prop="image"]');
    const imageAltField = itemNode.querySelector('[data-aue-prop="imageAlt"]');
    const ctaLinkField = itemNode.querySelector('[data-aue-prop="ctaLink"]');
    const ctaTextField = itemNode.querySelector('[data-aue-prop="ctaText"]');

    let mediaElement;
    if (videoField && videoField.textContent.trim()) {
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'banner-component-video-wrapper';

      const video = document.createElement('video');
      video.className = 'banner-component-w-100 banner-component-object-fit-cover banner-component-media banner-component-video';
      video.title = 'Video';
      video.setAttribute('aria-label', 'Video');
      video.setAttribute('data-is-autoplay', 'true');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('loop', 'false');
      video.setAttribute('muted', 'true');
      video.setAttribute('autoplay', 'true');

      const source = document.createElement('source');
      source.src = videoField.textContent.trim();
      source.type = 'video/mp4';
      video.append(source);

      const playPauseOverlay = document.createElement('div');
      playPauseOverlay.className = 'position-absolute banner-component-w-100 banner-component-h-100 banner-component-start-0 banner-component-top-0 banner-component-d-flex banner-component-justify-content-center banner-component-align-items-center banner-component-cursor-pointer';

      const playButton = document.createElement('button');
      playButton.type = 'button';
      playButton.className = 'banner-component-d-none banner-component-video-icon banner-component-icon-play banner-component-bg-transparent banner-component-d-flex banner-component-align-items-center banner-component-justify-content-center banner-component-cursor-pointer';
      // Assuming play button content is an SVG path or similar, for now, just text
      playButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773311857653.svg+xml';

      const pauseButton = document.createElement('button');
      pauseButton.type = 'button';
      pauseButton.className = 'banner-component-d-block banner-component-video-icon banner-component-icon-pause banner-component-bg-transparent banner-component-d-flex banner-component-align-items-center banner-component-justify-content-center banner-component-cursor-pointer';
      pauseButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773311857749.svg+xml';

      playPauseOverlay.append(playButton, pauseButton);

      const muteIconDiv = document.createElement('div');
      muteIconDiv.className = 'position-absolute banner-component-z-2 banner-component-d-flex banner-component-justify-content-center banner-component-align-items-center banner-component-cursor-pointer banner-component-mute-icon';

      const muteButton = document.createElement('button');
      muteButton.type = 'button';
      muteButton.className = 'banner-component-video-icon-volume banner-component-icon-mute banner-component-bg-transparent banner-component-d-flex banner-component-align-items-center banner-component-justify-content-center banner-component-cursor-pointer banner-component-d-none';
      muteButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773311857898.svg+xml';

      const unmuteButton = document.createElement('button');
      unmuteButton.type = 'button';
      unmuteButton.className = 'banner-component-video-icon-volume banner-component-icon-unmute banner-component-bg-transparent banner-component-d-flex banner-component-align-items-center banner-component-justify-content-center banner-component-cursor-pointer banner-component-d-none';
      unmuteButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773311858038.svg+xml';

      const noAudioButton = document.createElement('button');
      noAudioButton.type = 'button';
      noAudioButton.className = 'banner-component-video-icon-volume banner-component-no-audio-icon banner-component-bg-transparent banner-component-d-flex banner-component-align-items-center banner-component-justify-content-center banner-component-cursor-pointer';
      noAudioButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773311858539.svg+xml';

      muteIconDiv.append(muteButton, unmuteButton, noAudioButton);

      videoWrapper.append(video, playPauseOverlay, muteIconDiv);
      mediaElement = videoWrapper;
      moveInstrumentation(videoField, videoWrapper);
    } else if (imageField && imageField.textContent.trim()) {
      const imgAlt = imageAltField ? imageAltField.textContent.trim() : '';
      const picture = createOptimizedPicture(imageField.textContent.trim(), imgAlt);
      picture.querySelector('img').className = 'banner-component-w-100 banner-component-h-100 banner-component-object-fit-cover banner-component-media banner-component-image';
      picture.querySelector('img').setAttribute('loading', 'eager');
      picture.querySelector('img').setAttribute('fetchpriority', 'high');
      picture.querySelector('img').setAttribute('decoding', 'async');
      mediaElement = picture;
      moveInstrumentation(imageField, picture);
      if (imageAltField) {
        moveInstrumentation(imageAltField, picture);
      }
    }

    if (mediaElement) {
      bannerWrapper.append(mediaElement);
    }

    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'position-absolute banner-component-start-50 banner-component-translate-middle-x banner-component-w-100 boing__banner--cta';

    const bannerCtaComponent = document.createElement('div');
    bannerCtaComponent.className = 'banner-cta-component';

    if (ctaLinkField && ctaLinkField.textContent.trim() && ctaTextField && ctaTextField.textContent.trim()) {
      const textCenterDiv = document.createElement('div');
      textCenterDiv.className = 'text-center';

      const ctaAnchor = document.createElement('a');
      ctaAnchor.id = `cta-${index}`;
      ctaAnchor.className = 'cmp-button analytics_cta_click text-center cta-layout';
      ctaAnchor.setAttribute('data-link-region', 'CTA');
      ctaAnchor.setAttribute('data-is-internal', 'true');
      ctaAnchor.setAttribute('data-enable-gating', 'false');
      ctaAnchor.href = ctaLinkField.textContent.trim();
      ctaAnchor.target = '_blank';

      const ctaSpan = document.createElement('span');
      ctaSpan.className = 'cmp-button__text primary-btn banner-cta-w-75 banner-cta-p-5 banner-cta-rounded-pill banner-cta-d-inline-flex banner-cta-justify-content-center banner-cta-align-items-center famlf-cta-btn';
      ctaSpan.textContent = ctaTextField.textContent.trim();

      ctaAnchor.append(ctaSpan);

      const popupDiv = document.createElement('div');
      popupDiv.className = 'pop-up banner-cta-d-none';
      popupDiv.innerHTML = '<input type="hidden" class="popup-message"><input type="hidden" class="proceed-button-label"><input type="hidden" class="cancel-button-label"><input type="hidden" class="background-color">';

      textCenterDiv.append(ctaAnchor, popupDiv);
      bannerCtaComponent.append(textCenterDiv);
      moveInstrumentation(ctaLinkField, ctaAnchor);
      moveInstrumentation(ctaTextField, ctaAnchor);
    }

    ctaDiv.append(bannerCtaComponent);
    bannerWrapper.append(ctaDiv);
    bannerSection.append(bannerWrapper);
    bannerComponent.append(bannerSection);
    swiperSlide.append(bannerComponent);
    swiperWrapper.append(swiperSlide);
    moveInstrumentation(itemNode, swiperSlide);
  });

  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'cmp-carousel__actions';
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
  swiperWrapper.append(actionsDiv);

  swiper.append(swiperWrapper);

  const carouselSwiperContainer = document.createElement('div');
  carouselSwiperContainer.className = 'carousel-swiper-container';
  carouselSwiperContainer.innerHTML = `
    <div>
      <button class="carousel-primary-swiper__buttonNext position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer analytics_cta_click disabled" disabled="">
        /content/dam/aemigrate/uploaded-folder/image/1773311858912.svg+xml
      </button>
    </div>
    <div>
      <button class="carousel-primary-swiper__buttonPrev position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer analytics_cta_click">
        /content/dam/aemigrate/uploaded-folder/image/1773311859030.svg+xml
      </button>
    </div>
  `;
  swiper.append(carouselSwiperContainer);

  const swiperPagination = document.createElement('div');
  swiperPagination.className = 'swiper-pagination carousel-primary-swiper-pagination carousel-pagination-set carousel-mb-md-8 carousel-mb-10 carousel-mt-6 position-absolute swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal';
  swiperPagination.innerHTML = `
    <span class="swiper-pagination-bullet"></span>
    <span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>
  `;
  swiper.append(swiperPagination);

  carouselContainer.append(swiper);

  block.textContent = '';
  block.append(carouselContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
