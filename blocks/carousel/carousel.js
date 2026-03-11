import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-position-relative');

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('carousel-swiper', 'carousel-primary-swiper', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  swiperContainer.setAttribute('role', 'group');
  swiperContainer.setAttribute('aria-live', 'polite');
  swiperContainer.setAttribute('aria-roledescription', 'carousel');
  swiperContainer.setAttribute('data-is-autoplay', 'true');
  swiperContainer.setAttribute('data-delay', '5000');
  swiperContainer.setAttribute('data-autopause-disabled', 'true');
  swiperContainer.setAttribute('data-is-loop', 'false');
  swiperContainer.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('carousel-swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  const carouselSlides = block.querySelectorAll('[data-aue-model="carouselSlide"]');
  carouselSlides.forEach((slide, index) => {
    const slideWrapper = document.createElement('div');
    slideWrapper.classList.add('carousel-swiper-slide', 'carousel-primary-swiper-slide');
    slideWrapper.setAttribute('role', 'tabpanel');
    slideWrapper.setAttribute('aria-roledescription', 'slide');
    slideWrapper.setAttribute('data-cmp-hook-carousel', 'item');

    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('banner');

    const section = document.createElement('section');
    section.classList.add('banner-section');

    const sectionWrapper = document.createElement('div');
    sectionWrapper.classList.add('carousel-position-relative', 'carousel-boing', 'banner-section__wrapper');

    const videoField = slide.querySelector('[data-aue-prop="video"]');
    const imageField = slide.querySelector('[data-aue-prop="image"]');
    const ctaLinkField = slide.querySelector('[data-aue-prop="ctaLink"]');
    const ctaTextField = slide.querySelector('[data-aue-prop="ctaText"]');

    if (videoField) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('banner-video-wrapper');

      const video = document.createElement('video');
      video.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'banner-media', 'banner-video');
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
      source.setAttribute('src', videoField.getAttribute('href') || videoField.textContent.trim());
      source.setAttribute('type', 'video/mp4');
      video.append(source);
      videoWrapper.append(video);
      moveInstrumentation(videoField, videoWrapper);

      const controlsWrapper = document.createElement('div');
      controlsWrapper.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('carousel-d-none', 'banner-video-icon', 'banner-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      playButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773217200362.svg+xml'; // Placeholder, replace with actual SVG
      controlsWrapper.append(playButton);

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('carousel-d-block', 'banner-video-icon', 'banner-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      pauseButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773217200389.svg+xml'; // Placeholder, replace with actual SVG
      controlsWrapper.append(pauseButton);
      videoWrapper.append(controlsWrapper);

      const muteIconWrapper = document.createElement('div');
      muteIconWrapper.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'banner-mute-icon');

      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('banner-video-icon-volume', 'banner-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      muteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773217200473.svg+xml'; // Placeholder, replace with actual SVG
      muteIconWrapper.append(muteButton);

      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('banner-video-icon-volume', 'banner-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      unmuteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773217200505.svg+xml'; // Placeholder, replace with actual SVG
      muteIconWrapper.append(unmuteButton);

      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('banner-video-icon-volume', 'banner-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      noAudioButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773217200550.svg+xml'; // Placeholder, replace with actual SVG
      muteIconWrapper.append(noAudioButton);
      videoWrapper.append(muteIconWrapper);

      sectionWrapper.append(videoWrapper);
    } else if (imageField) {
      const img = imageField.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, true, [{ width: '2000' }]);
        picture.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'banner-media', 'banner-image');
        sectionWrapper.append(picture);
        moveInstrumentation(imageField, picture);
      }
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

    const bannerCtaDiv = document.createElement('div');
    bannerCtaDiv.classList.add('banner-cta');

    if (ctaLinkField && ctaTextField) {
      const ctaContainer = document.createElement('div');
      ctaContainer.classList.add('carousel-text-center');

      const ctaLink = document.createElement('a');
      ctaLink.setAttribute('id', `cta-${Math.random().toString(36).substring(2, 11)}`);
      ctaLink.classList.add('cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      ctaLink.setAttribute('data-link-region', 'CTA');
      ctaLink.setAttribute('data-is-internal', 'true');
      ctaLink.setAttribute('data-enable-gating', 'false');
      ctaLink.setAttribute('href', ctaLinkField.getAttribute('href') || ctaLinkField.textContent.trim());
      ctaLink.setAttribute('target', '_blank');

      const ctaSpan = document.createElement('span');
      ctaSpan.classList.add('cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      ctaSpan.textContent = ctaTextField.textContent.trim();
      ctaLink.append(ctaSpan);
      ctaContainer.append(ctaLink);
      moveInstrumentation(ctaLinkField, ctaLink);
      moveInstrumentation(ctaTextField, ctaLink);

      const popupDiv = document.createElement('div');
      popupDiv.classList.add('carousel-pop-up', 'carousel-d-none');
      popupDiv.innerHTML = '<input type="hidden" class="carousel-popup-message"><input type="hidden" class="carousel-proceed-button-label"><input type="hidden" class="carousel-cancel-button-label"><input type="hidden" class="carousel-background-color">';
      ctaContainer.append(popupDiv);

      bannerCtaDiv.append(ctaContainer);
    }
    ctaWrapper.append(bannerCtaDiv);
    sectionWrapper.append(ctaWrapper);

    section.append(sectionWrapper);
    bannerDiv.append(section);
    slideWrapper.append(bannerDiv);
    swiperWrapper.append(slideWrapper);
    moveInstrumentation(slide, slideWrapper);
  });

  swiperContainer.append(swiperWrapper);

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
  swiperContainer.append(actionsDiv);

  const swiperNavContainer = document.createElement('div');
  swiperNavContainer.classList.add('carousel-swiper-container');
  swiperNavContainer.innerHTML = `
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
  swiperContainer.append(swiperNavContainer);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('carousel-swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'carousel-swiper-pagination-clickable', 'carousel-swiper-pagination-bullets', 'carousel-swiper-pagination-horizontal');
  swiperContainer.append(paginationDiv);

  carouselWrapper.append(swiperContainer);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}