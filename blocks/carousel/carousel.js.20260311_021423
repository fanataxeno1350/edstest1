import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselPositionRelative = document.createElement('div');
  carouselPositionRelative.className = 'carousel-position-relative';

  const carouselSwiper = document.createElement('div');
  carouselSwiper.className = 'carousel-swiper carousel-primary-swiper carousel-primary-swiper-carousel-419d8524f7 swiper-initialized swiper-horizontal swiper-backface-hidden';
  carouselSwiper.setAttribute('data-swiper-id', '.carousel-primary-swiper-carousel-419d8524f7');
  carouselSwiper.id = 'carousel-419d8524f7';
  carouselSwiper.setAttribute('role', 'group');
  carouselSwiper.setAttribute('aria-live', 'polite');
  carouselSwiper.setAttribute('aria-roledescription', 'carousel');
  carouselSwiper.setAttribute('data-is-autoplay', 'true');
  carouselSwiper.setAttribute('data-delay', '5000');
  carouselSwiper.setAttribute('data-autopause-disabled', 'true');
  carouselSwiper.setAttribute('data-is-loop', 'false');
  carouselSwiper.setAttribute('data-placeholder-text', 'false');

  const carouselSwiperWrapper = document.createElement('div');
  carouselSwiperWrapper.className = 'carousel-swiper-wrapper carousel-primary-swiper-wrapper carousel-z-0';

  const carouselItems = block.querySelectorAll('[data-aue-model="carouselItem"]');

  carouselItems.forEach((itemNode, index) => {
    const carouselSwiperSlide = document.createElement('div');
    carouselSwiperSlide.className = `carousel-swiper-slide carousel-primary-swiper-slide ${index === 0 ? 'carousel-swiper-slide-prev' : 'carousel-swiper-slide-active'}`;
    carouselSwiperSlide.setAttribute('role', 'tabpanel');
    carouselSwiperSlide.setAttribute('aria-labelledby', `carousel-419d8524f7-item-${index}-tab`);
    carouselSwiperSlide.setAttribute('aria-roledescription', 'slide');

    const bannerDiv = document.createElement('div');
    bannerDiv.className = 'banner';

    const bannerSection = document.createElement('section');
    bannerSection.className = 'banner-section';

    const bannerSectionWrapper = document.createElement('div');
    bannerSectionWrapper.className = 'carousel-position-relative carousel-boing banner-section__wrapper ';

    const videoField = itemNode.querySelector('[data-aue-prop="video"]');
    const imageField = itemNode.querySelector('[data-aue-prop="image"]');
    const ctaLinkField = itemNode.querySelector('[data-aue-prop="ctaLink"]');

    if (videoField) {
      const bannerVideoWrapper = document.createElement('div');
      bannerVideoWrapper.className = 'banner-video-wrapper';

      const videoElement = document.createElement('video');
      videoElement.className = 'carousel-w-100 carousel-object-fit-cover banner-media banner-video';
      videoElement.title = 'Video';
      videoElement.ariaLabel = 'Video';
      videoElement.setAttribute('data-is-autoplay', 'true');
      videoElement.playsInline = true;
      videoElement.preload = 'metadata';
      videoElement.fetchPriority = 'high';
      videoElement.loop = false;
      videoElement.muted = true;
      videoElement.autoplay = true;

      const sourceElement = document.createElement('source');
      sourceElement.src = videoField.textContent.trim();
      sourceElement.type = 'video/mp4';
      videoElement.append(sourceElement);

      const playPauseWrapper = document.createElement('div');
      playPauseWrapper.className = 'carousel-position-absolute carousel-w-100 carousel-h-100 carousel-start-0 carousel-top-0 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer';

      const playButton = document.createElement('button');
      playButton.type = 'button';
      playButton.className = 'carousel-d-none banner-video-icon banner-icon-play carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      playButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773217200362.svg+xml';

      const pauseButton = document.createElement('button');
      pauseButton.type = 'button';
      pauseButton.className = 'carousel-d-block banner-video-icon banner-icon-pause carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      pauseButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773217200389.svg+xml';

      playPauseWrapper.append(playButton, pauseButton);

      const muteIconWrapper = document.createElement('div');
      muteIconWrapper.className = 'carousel-position-absolute carousel-z-2 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer banner-mute-icon ';

      const muteButton = document.createElement('button');
      muteButton.type = 'button';
      muteButton.className = 'banner-video-icon-volume banner-icon-mute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none';
      muteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773217200473.svg+xml';

      const unmuteButton = document.createElement('button');
      unmuteButton.type = 'button';
      unmuteButton.className = 'banner-video-icon-volume banner-icon-unmute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none';
      unmuteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773217200505.svg+xml';

      const noAudioButton = document.createElement('button');
      noAudioButton.type = 'button';
      noAudioButton.className = 'banner-video-icon-volume banner-no-audio-icon carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      noAudioButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773217200550.svg+xml';

      muteIconWrapper.append(muteButton, unmuteButton, noAudioButton);

      bannerVideoWrapper.append(videoElement, playPauseWrapper, muteIconWrapper);
      bannerSectionWrapper.append(bannerVideoWrapper);
      moveInstrumentation(videoField, bannerVideoWrapper);
    } else if (imageField) {
      const img = imageField.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, true, [{ width: '2000' }]);
        picture.querySelector('img').className = 'carousel-w-100 carousel-h-100 carousel-object-fit-cover banner-media banner-image';
        bannerSectionWrapper.append(picture);
        moveInstrumentation(imageField, picture);
      }
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'carousel-position-absolute carousel-start-50 carousel-translate-middle-x carousel-w-100 carousel-boing__banner--cta';

    const bannerCtaDiv = document.createElement('div');
    bannerCtaDiv.className = 'banner-cta';

    if (ctaLinkField) {
      const ctaLink = ctaLinkField.querySelector('a');
      if (ctaLink) {
        const ctaContainer = document.createElement('div');
        ctaContainer.className = 'carousel-text-center ';
        const newCtaLink = document.createElement('a');
        newCtaLink.id = `cta-${Math.random().toString(36).substring(2, 11)}`;
        newCtaLink.className = 'cmp-button carousel-analytics_cta_click carousel-text-center carousel-cta-layout';
        newCtaLink.setAttribute('data-link-region', 'CTA');
        newCtaLink.setAttribute('data-is-internal', 'true');
        newCtaLink.setAttribute('data-enable-gating', 'false');
        newCtaLink.href = ctaLink.href;
        newCtaLink.target = '_blank';

        const spanText = document.createElement('span');
        spanText.className = 'cmp-button__text carousel-primary-btn carousel-w-75 carousel-p-5 carousel-rounded-pill carousel-d-inline-flex carousel-justify-content-center carousel-align-items-center carousel-famlf-cta-btn';
        spanText.textContent = ctaLink.textContent.trim();
        newCtaLink.append(spanText);

        const popUpDiv = document.createElement('div');
        popUpDiv.className = 'carousel-pop-up carousel-d-none';
        popUpDiv.innerHTML = '<input type="hidden" class="carousel-popup-message"><input type="hidden" class="carousel-proceed-button-label"><input type="hidden" class="carousel-cancel-button-label"><input type="hidden" class="carousel-background-color">';

        ctaContainer.append(newCtaLink, popUpDiv);
        bannerCtaDiv.append(ctaContainer);
        moveInstrumentation(ctaLinkField, bannerCtaDiv);
      }
    }

    ctaWrapper.append(bannerCtaDiv);
    bannerSectionWrapper.append(ctaWrapper);
    bannerSection.append(bannerSectionWrapper);
    bannerDiv.append(bannerSection);
    carouselSwiperSlide.append(bannerDiv);
    carouselSwiperWrapper.append(carouselSwiperSlide);
    moveInstrumentation(itemNode, carouselSwiperSlide);
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
  carouselSwiperWrapper.append(actionsDiv);

  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'carousel-swiper-container';
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

  const swiperPagination = document.createElement('div');
  swiperPagination.className = 'carousel-swiper-pagination carousel-primary-swiper-pagination carousel-pagination-set carousel-mb-md-8 carousel-mb-10 carousel-mt-6 carousel-position-absolute carousel-swiper-pagination-clickable carousel-swiper-pagination-bullets carousel-swiper-pagination-horizontal';
  swiperPagination.innerHTML = '<span class="carousel-swiper-pagination-bullet"></span><span class="carousel-swiper-pagination-bullet carousel-swiper-pagination-bullet-active"></span>';

  carouselSwiper.append(carouselSwiperWrapper, swiperContainer, swiperPagination);
  carouselPositionRelative.append(carouselSwiper);

  block.textContent = '';
  block.append(carouselPositionRelative);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}