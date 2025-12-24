import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselPositionRelative = document.createElement('div');
  carouselPositionRelative.className = 'carousel-position-relative';

  const swiper = document.createElement('div');
  swiper.className = 'swiper carousel-primary-swiper';
  swiper.setAttribute('role', 'group');
  swiper.setAttribute('aria-live', 'polite');
  swiper.setAttribute('aria-roledescription', 'carousel');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper carousel-primary-swiper-wrapper carousel-z-0';

  const slides = [...block.children];
  slides.forEach((slide) => {
    const slideWrapper = document.createElement('div');
    slideWrapper.className = 'swiper-slide carousel-primary-swiper-slide';
    slideWrapper.setAttribute('role', 'tabpanel');
    slideWrapper.setAttribute('aria-roledescription', 'slide');

    const carouselBanner = document.createElement('div');
    carouselBanner.className = 'carousel-banner';

    const section = document.createElement('section');
    section.className = 'carousel-banner-section';

    const sectionWrapper = document.createElement('div');
    sectionWrapper.className = 'carousel-position-relative carousel-boing carousel-banner-section__wrapper';

    const videoElement = slide.querySelector('[data-aue-prop="video"]');
    const imageElement = slide.querySelector('[data-aue-prop="image"]');
    const ctaLinkElement = slide.querySelector('[data-aue-prop="ctaLink"]');
    const ctaTextElement = slide.querySelector('[data-aue-prop="ctaText"]');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'carousel-video-wrapper';

      const video = document.createElement('video');
      video.className = 'carousel-w-100 carousel-object-fit-cover carousel-banner-media carousel-banner-video';
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

      const playPauseWrapper = document.createElement('div');
      playPauseWrapper.className = 'carousel-position-absolute carousel-w-100 carousel-h-100 carousel-start-0 carousel-top-0 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer';

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.className = 'carousel-d-none carousel-video-icon carousel-icon-play carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      playButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1766555772881.svg+xml'; // Placeholder for SVG

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.className = 'carousel-d-block carousel-video-icon carousel-icon-pause carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      pauseButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1766555772899.svg+xml'; // Placeholder for SVG

      playPauseWrapper.append(playButton, pauseButton);

      const muteIconWrapper = document.createElement('div');
      muteIconWrapper.className = 'carousel-position-absolute carousel-z-2 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer carousel-mute-icon';

      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.className = 'carousel-video-icon-volume carousel-icon-mute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none';
      muteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1766555772935.svg+xml'; // Placeholder for SVG

      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.className = 'carousel-video-icon-volume carousel-icon-unmute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none';
      unmuteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1766555772963.svg+xml'; // Placeholder for SVG

      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.className = 'carousel-video-icon-volume carousel-no-audio-icon carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      noAudioButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1766555772987.svg+xml'; // Placeholder for SVG

      muteIconWrapper.append(muteButton, unmuteButton, noAudioButton);

      videoWrapper.append(video, playPauseWrapper, muteIconWrapper);
      sectionWrapper.append(videoWrapper);
      moveInstrumentation(videoElement, videoWrapper);
    } else if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]);
        picture.querySelector('img').className = 'carousel-w-100 carousel-h-100 carousel-object-fit-cover carousel-banner-media carousel-banner-image';
        picture.querySelector('img').setAttribute('loading', 'eager');
        picture.querySelector('img').setAttribute('fetchpriority', 'high');
        picture.querySelector('img').setAttribute('decoding', 'async');
        sectionWrapper.append(picture);
        moveInstrumentation(imageElement, picture);
      }
    }

    const ctaBannerWrapper = document.createElement('div');
    ctaBannerWrapper.className = 'carousel-position-absolute carousel-start-50 carousel-translate-middle-x carousel-w-100 carousel-boing__banner--cta';

    const ctaBanner = document.createElement('div');
    ctaBanner.className = 'carousel-banner-cta';

    if (ctaLinkElement && ctaTextElement) {
      const ctaTextCenter = document.createElement('div');
      ctaTextCenter.className = 'carousel-text-center';

      const ctaAnchor = document.createElement('a');
      ctaAnchor.className = 'carousel-cmp-button carousel-analytics_cta_click carousel-text-center carousel-cta-layout';
      ctaAnchor.setAttribute('data-link-region', 'CTA');
      ctaAnchor.setAttribute('data-is-internal', 'true');
      ctaAnchor.setAttribute('data-enable-gating', 'false');
      ctaAnchor.setAttribute('href', ctaLinkElement.textContent.trim());
      ctaAnchor.setAttribute('target', '_blank');

      const ctaSpan = document.createElement('span');
      ctaSpan.className = 'carousel-cmp-button__text carousel-primary-btn carousel-w-75 carousel-p-5 carousel-rounded-pill carousel-d-inline-flex carousel-justify-content-center carousel-align-items-center carousel-famlf-cta-btn';
      ctaSpan.textContent = ctaTextElement.textContent.trim();

      ctaAnchor.append(ctaSpan);

      const popUp = document.createElement('div');
      popUp.className = 'carousel-pop-up carousel-d-none';

      const popupMessage = document.createElement('input');
      popupMessage.setAttribute('type', 'hidden');
      popupMessage.className = 'carousel-popup-message';
      const proceedButton = document.createElement('input');
      proceedButton.setAttribute('type', 'hidden');
      proceedButton.className = 'carousel-proceed-button-label';
      const cancelButton = document.createElement('input');
      cancelButton.setAttribute('type', 'hidden');
      cancelButton.className = 'carousel-cancel-button-label';
      const backgroundColor = document.createElement('input');
      backgroundColor.setAttribute('type', 'hidden');
      backgroundColor.className = 'carousel-background-color';

      popUp.append(popupMessage, proceedButton, cancelButton, backgroundColor);
      ctaTextCenter.append(ctaAnchor, popUp);
      ctaBanner.append(ctaTextCenter);
      moveInstrumentation(ctaLinkElement, ctaAnchor);
      moveInstrumentation(ctaTextElement, ctaSpan);
    }

    ctaBannerWrapper.append(ctaBanner);
    sectionWrapper.append(ctaBannerWrapper);
    section.append(sectionWrapper);
    carouselBanner.append(section);
    slideWrapper.append(carouselBanner);
    swiperWrapper.append(slideWrapper);
    moveInstrumentation(slide, slideWrapper);
  });

  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'carousel-cmp-carousel__actions';

  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-cmp-carousel__action carousel-cmp-carousel__action--previous';
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.setAttribute('data-cmp-hook-carousel', 'previous');
  prevButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text">Previous</span>';

  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-cmp-carousel__action carousel-cmp-carousel__action--next';
  nextButton.setAttribute('type', 'button');
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.setAttribute('data-cmp-hook-carousel', 'next');
  nextButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text">Next</span>';

  const pauseButton = document.createElement('button');
  pauseButton.className = 'carousel-cmp-carousel__action carousel-cmp-carousel__action--pause';
  pauseButton.setAttribute('type', 'button');
  pauseButton.setAttribute('aria-label', 'Pause');
  pauseButton.setAttribute('data-cmp-hook-carousel', 'pause');
  pauseButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text">Pause</span>';

  const playButton = document.createElement('button');
  playButton.className = 'carousel-cmp-carousel__action carousel-cmp-carousel__action--play carousel-cmp-carousel__action--disabled';
  playButton.setAttribute('type', 'button');
  playButton.setAttribute('aria-label', 'Play');
  playButton.setAttribute('data-cmp-hook-carousel', 'play');
  playButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text">Play</span>';

  actionsDiv.append(prevButton, nextButton, pauseButton, playButton);

  swiperWrapper.append(actionsDiv);
  swiper.append(swiperWrapper);

  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'carousel-swiper-container';

  const nextButtonWrapper = document.createElement('div');
  const nextSwiperButton = document.createElement('button');
  nextSwiperButton.className = 'carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click carousel-disabled';
  nextSwiperButton.setAttribute('disabled', '');
  nextSwiperButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1766555773014.svg+xml';
  nextButtonWrapper.append(nextSwiperButton);

  const prevButtonWrapper = document.createElement('div');
  const prevSwiperButton = document.createElement('button');
  prevSwiperButton.className = 'carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click';
  prevSwiperButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1766555773044.svg+xml';
  prevButtonWrapper.append(prevSwiperButton);

  swiperContainer.append(nextButtonWrapper, prevButtonWrapper);

  const pagination = document.createElement('div');
  pagination.className = 'carousel-swiper-pagination carousel-primary-swiper-pagination carousel-pagination-set carousel-mb-md-8 carousel-mb-10 carousel-mt-6 carousel-position-absolute carousel-swiper-pagination-clickable carousel-swiper-pagination-bullets carousel-swiper-pagination-horizontal';

  swiper.append(swiperContainer, pagination);
  carouselPositionRelative.append(swiper);

  block.textContent = '';
  block.append(carouselPositionRelative);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
