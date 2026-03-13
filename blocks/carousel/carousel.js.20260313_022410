import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselPositionRelative = document.createElement('div');
  carouselPositionRelative.className = 'carousel-position-relative';

  const swiperCarousel = document.createElement('div');
  swiperCarousel.className = 'swiper carousel-primary-swiper carousel-primary-swiper-carousel-419d8524f7 swiper-initialized swiper-horizontal swiper-backface-hidden';
  swiperCarousel.setAttribute('data-swiper-id', '.carousel-primary-swiper-carousel-419d8524f7');
  swiperCarousel.id = 'carousel-419d8524f7';
  swiperCarousel.setAttribute('role', 'group');
  swiperCarousel.setAttribute('aria-live', 'polite');
  swiperCarousel.setAttribute('aria-roledescription', 'carousel');
  swiperCarousel.setAttribute('data-is-autoplay', 'true');
  swiperCarousel.setAttribute('data-delay', '5000');
  swiperCarousel.setAttribute('data-autopause-disabled', 'true');
  swiperCarousel.setAttribute('data-is-loop', 'false');
  swiperCarousel.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper carousel-primary-swiper-wrapper carousel-z-0';

  const carouselItems = block.querySelectorAll('[data-aue-model="carouselItem"]');
  carouselItems.forEach((itemNode) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.className = 'swiper-slide carousel-primary-swiper-slide';
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');

    const carouselBanner = document.createElement('div');
    carouselBanner.className = 'carousel-banner';

    const section = document.createElement('section');
    section.className = 'carousel-banner-section';

    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-position-relative carousel-boing carousel-banner-section__wrapper';

    const videoElement = itemNode.querySelector('[data-aue-prop="video"]');
    const imageElement = itemNode.querySelector('[data-aue-prop="image"]');
    const ctaLinkElement = itemNode.querySelector('[data-aue-prop="ctaLink"]');
    const ctaTextElement = itemNode.querySelector('[data-aue-prop="ctaText"]');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'carousel-video-wrapper';

      const video = document.createElement('video');
      video.className = 'carousel-w-100 carousel-object-fit-cover carousel-banner-media carousel-banner-video';
      video.title = 'Video';
      video.setAttribute('aria-label', 'Video');
      video.setAttribute('data-is-autoplay', 'true');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('loop', 'false');
      video.setAttribute('muted', 'true');
      video.setAttribute('autoplay', 'true');

      const sourceMp4 = document.createElement('source');
      sourceMp4.src = videoElement.href || videoElement.textContent.trim();
      sourceMp4.type = 'video/mp4';
      video.append(sourceMp4);

      const sourceWebm = document.createElement('source');
      sourceWebm.src = videoElement.href || videoElement.textContent.trim();
      sourceWebm.type = 'video/webm';
      video.append(sourceWebm);

      videoWrapper.append(video);

      const playPauseWrapper = document.createElement('div');
      playPauseWrapper.className = 'carousel-position-absolute carousel-w-100 carousel-h-100 carousel-start-0 carousel-top-0 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer';

      const playButton = document.createElement('button');
      playButton.type = 'button';
      playButton.className = 'carousel-d-none carousel-video-icon carousel-icon-play carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      playButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1761293302196.svg+xml';

      const pauseButton = document.createElement('button');
      pauseButton.type = 'button';
      pauseButton.className = 'carousel-d-block carousel-video-icon carousel-icon-pause carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      pauseButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1761293302205.svg+xml';

      playPauseWrapper.append(playButton, pauseButton);
      videoWrapper.append(playPauseWrapper);

      const muteWrapper = document.createElement('div');
      muteWrapper.className = 'carousel-position-absolute carousel-z-2 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer carousel-mute-icon';

      const muteButton = document.createElement('button');
      muteButton.type = 'button';
      muteButton.className = 'carousel-video-icon-volume carousel-icon-mute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none';
      muteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1761293302228.svg+xml';

      const unmuteButton = document.createElement('button');
      unmuteButton.type = 'button';
      unmuteButton.className = 'carousel-video-icon-volume carousel-icon-unmute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none';
      unmuteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1761293302252.svg+xml';

      const noAudioButton = document.createElement('button');
      noAudioButton.type = 'button';
      noAudioButton.className = 'carousel-video-icon-volume carousel-no-audio-icon carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      noAudioButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1761293302277.svg+xml';

      muteWrapper.append(muteButton, unmuteButton, noAudioButton);
      videoWrapper.append(muteWrapper);

      wrapper.append(videoWrapper);
      moveInstrumentation(videoElement, videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src || imageElement.href, imageElement.alt, true, [{ width: '2000' }]);
      picture.querySelector('img').className = 'carousel-w-100 carousel-h-100 carousel-object-fit-cover carousel-banner-media carousel-banner-image';
      picture.querySelector('img').setAttribute('loading', 'eager');
      picture.querySelector('img').setAttribute('fetchpriority', 'high');
      picture.querySelector('img').setAttribute('decoding', 'async');
      wrapper.append(picture);
      moveInstrumentation(imageElement, picture);
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'carousel-position-absolute carousel-start-50 carousel-translate-middle-x carousel-w-100 carousel-boing__banner--cta';

    const bannerCta = document.createElement('div');
    bannerCta.className = 'carousel-banner-cta';

    if (ctaLinkElement && ctaTextElement) {
      const textCenterDiv = document.createElement('div');
      textCenterDiv.className = 'carousel-text-center';

      const ctaAnchor = document.createElement('a');
      ctaAnchor.id = 'cta-5b69d7d699'; // Hardcoded ID from sample, consider dynamic if needed
      ctaAnchor.className = 'carousel-cmp-button carousel-analytics_cta_click carousel-text-center carousel-cta-layout';
      ctaAnchor.setAttribute('data-link-region', 'CTA');
      ctaAnchor.setAttribute('data-is-internal', 'false');
      ctaAnchor.setAttribute('data-enable-gating', 'false');
      ctaAnchor.href = ctaLinkElement.href || ctaLinkElement.textContent.trim();
      ctaAnchor.target = '_blank';

      const ctaSpan = document.createElement('span');
      ctaSpan.className = 'carousel-cmp-button__text carousel-primary-btn carousel-w-75 carousel-p-5 carousel-rounded-pill carousel-d-inline-flex carousel-justify-content-center carousel-align-items-center carousel-famlf-cta-btn';
      ctaSpan.textContent = ctaTextElement.textContent.trim();
      ctaAnchor.append(ctaSpan);
      textCenterDiv.append(ctaAnchor);

      const popupDiv = document.createElement('div');
      popupDiv.className = 'carousel-pop-up carousel-d-none';
      popupDiv.innerHTML = '<input type="hidden" class="carousel-popup-message"><input type="hidden" class="carousel-proceed-button-label"><input type="hidden" class="carousel-cancel-button-label"><input type="hidden" class="carousel-background-color">';
      textCenterDiv.append(popupDiv);

      bannerCta.append(textCenterDiv);
      moveInstrumentation(ctaLinkElement, ctaAnchor);
      moveInstrumentation(ctaTextElement, ctaSpan);
    }

    ctaWrapper.append(bannerCta);
    wrapper.append(ctaWrapper);

    section.append(wrapper);
    carouselBanner.append(section);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
    moveInstrumentation(itemNode, swiperSlide);
  });

  swiperCarousel.append(swiperWrapper);

  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'carousel-cmp-carousel__actions';

  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-cmp-carousel__action carousel-cmp-carousel__action--previous';
  prevButton.type = 'button';
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.setAttribute('data-cmp-hook-carousel', 'previous');
  prevButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text">Previous</span>';

  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-cmp-carousel__action carousel-cmp-carousel__action--next';
  nextButton.type = 'button';
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.setAttribute('data-cmp-hook-carousel', 'next');
  nextButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text">Next</span>';

  const pauseButton = document.createElement('button');
  pauseButton.className = 'carousel-cmp-carousel__action carousel-cmp-carousel__action--pause';
  pauseButton.type = 'button';
  pauseButton.setAttribute('aria-label', 'Pause');
  pauseButton.setAttribute('data-cmp-hook-carousel', 'pause');
  pauseButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text">Pause</span>';

  const playButton = document.createElement('button');
  playButton.className = 'carousel-cmp-carousel__action carousel-cmp-carousel__action--play carousel-cmp-carousel__action--disabled';
  playButton.type = 'button';
  playButton.setAttribute('aria-label', 'Play');
  playButton.setAttribute('data-cmp-hook-carousel', 'play');
  playButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text">Play</span>';

  actionsDiv.append(prevButton, nextButton, pauseButton, playButton);
  swiperCarousel.append(actionsDiv);

  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'carousel-swiper-container';

  const nextButtonWrapper = document.createElement('div');
  const nextSwiperButton = document.createElement('button');
  nextSwiperButton.className = 'carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click carousel-disabled';
  nextSwiperButton.setAttribute('disabled', '');
  nextSwiperButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1761293302341.svg+xml';
  nextButtonWrapper.append(nextSwiperButton);

  const prevButtonWrapper = document.createElement('div');
  const prevSwiperButton = document.createElement('button');
  prevSwiperButton.className = 'carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click';
  prevSwiperButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1761293302355.svg+xml';
  prevButtonWrapper.append(prevSwiperButton);

  swiperContainer.append(nextButtonWrapper, prevButtonWrapper);
  swiperCarousel.append(swiperContainer);

  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'carousel-swiper-pagination carousel-primary-swiper-pagination carousel-pagination-set carousel-mb-md-8 carousel-mb-10 carousel-mt-6 carousel-position-absolute carousel-swiper-pagination-clickable carousel-swiper-pagination-bullets carousel-swiper-pagination-horizontal';
  paginationDiv.innerHTML = '<span class="carousel-swiper-pagination-bullet"></span><span class="carousel-swiper-pagination-bullet carousel-swiper-pagination-bullet-active"></span>';
  swiperCarousel.append(paginationDiv);

  carouselPositionRelative.append(swiperCarousel);

  block.textContent = '';
  block.append(carouselPositionRelative);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
