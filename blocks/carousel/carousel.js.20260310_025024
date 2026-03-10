import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselSwiper = document.createElement('div');
  carouselSwiper.className = 'carousel-swiper carousel-primary-swiper carousel-primary-swiper-carousel-419d8524f7 carousel-swiper-initialized carousel-swiper-horizontal carousel-swiper-backface-hidden';
  carouselSwiper.setAttribute('data-swiper-id', '.primary-swiper-carousel-419d8524f7');
  carouselSwiper.id = 'carousel-419d8524f7';
  carouselSwiper.setAttribute('role', 'group');
  carouselSwiper.setAttribute('aria-live', 'polite');
  carouselSwiper.setAttribute('aria-roledescription', 'carousel');
  carouselSwiper.setAttribute('data-is-autoplay', 'true');
  carouselSwiper.setAttribute('data-delay', '5000');
  carouselSwiper.setAttribute('data-autopause-disabled', 'true');
  carouselSwiper.setAttribute('data-is-loop', 'false');
  carouselSwiper.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'carousel-swiper-wrapper carousel-primary-swiper-wrapper carousel-z-0';
  carouselSwiper.append(swiperWrapper);

  [...block.children].forEach((row, index) => {
    const slide = document.createElement('div');
    moveInstrumentation(row, slide);
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.classList.add('carousel-swiper-slide', 'carousel-primary-swiper-slide');
    if (index === 0) {
      slide.classList.add('carousel-swiper-slide-prev');
      slide.setAttribute('data-active', '1');
    } else if (index === 1) {
      slide.classList.add('carousel-swiper-slide-active');
    }
    slide.setAttribute('data-cmp-hook-carousel', 'item');

    const bannerDiv = document.createElement('div');
    bannerDiv.className = 'carousel-banner-banner';
    slide.append(bannerDiv);

    const section = document.createElement('section');
    section.className = 'carousel-banner-banner-section';
    bannerDiv.append(section);

    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'carousel-position-relative carousel-boing carousel-banner-banner-section__wrapper';
    section.append(wrapperDiv);

    const cells = [...row.children];

    // Extract Video, Image, CTA URL, CTA Label
    const videoCell = cells[0];
    const imageCell = cells[1];
    const imageAltCell = cells[2];
    const ctaUrlCell = cells[3];
    const ctaLabelCell = cells[4];

    const video = videoCell?.querySelector('a');
    const image = imageCell?.querySelector('img');
    const imageAlt = imageAltCell?.textContent.trim();
    const ctaUrl = ctaUrlCell?.querySelector('a');
    const ctaLabel = ctaLabelCell?.textContent.trim();

    if (video) {
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'carousel-banner-video-wrapper';
      wrapperDiv.append(videoWrapper);

      const videoElement = document.createElement('video');
      videoElement.className = 'carousel-w-100 carousel-object-fit-cover carousel-banner-banner-media carousel-banner-banner-video';
      videoElement.title = 'Video';
      videoElement.ariaLabel = 'Video';
      videoElement.setAttribute('data-is-autoplay', 'true');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('preload', 'metadata');
      videoElement.setAttribute('fetchpriority', 'high');
      videoElement.setAttribute('loop', 'false');
      videoElement.setAttribute('muted', 'true');
      videoElement.setAttribute('autoplay', 'true');

      const source = document.createElement('source');
      source.src = video.href;
      source.type = 'video/mp4';
      videoElement.append(source);
      videoWrapper.append(videoElement);

      // Add play/pause buttons (simplified, as SVG content is complex)
      const playPauseWrapper = document.createElement('div');
      playPauseWrapper.className = 'carousel-position-absolute carousel-w-100 carousel-h-100 carousel-start-0 carousel-top-0 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer';
      videoWrapper.append(playPauseWrapper);

      const pauseButton = document.createElement('button');
      pauseButton.type = 'button';
      pauseButton.className = 'carousel-d-block carousel-video-icon carousel-icon-pause carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      // For actual SVG, you'd fetch and inject it or use an icon font
      // pauseButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1772510914294.svg+xml';
      playPauseWrapper.append(pauseButton);

      // Add mute/unmute buttons (simplified)
      const muteWrapper = document.createElement('div');
      muteWrapper.className = 'carousel-position-absolute carousel-z-2 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer carousel-mute-icon';
      videoWrapper.append(muteWrapper);

      const noAudioButton = document.createElement('button');
      noAudioButton.type = 'button';
      noAudioButton.className = 'carousel-video-icon-volume carousel-no-audio-icon carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      // noAudioButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1772510914514.svg+xml';
      muteWrapper.append(noAudioButton);

    } else if (image) {
      const optimizedPic = createOptimizedPicture(image.src, imageAlt || image.alt);
      moveInstrumentation(image, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-banner-media', 'carousel-banner-banner-image');
      optimizedPic.querySelector('img').setAttribute('loading', 'eager');
      optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
      optimizedPic.querySelector('img').setAttribute('decoding', 'async');
      wrapperDiv.append(optimizedPic);
    }

    if (ctaUrl && ctaLabel) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.className = 'carousel-position-absolute carousel-start-50 carousel-translate-middle-x carousel-w-100 carousel-boing__banner--cta';
      wrapperDiv.append(ctaWrapper);

      const ctaBannerDiv = document.createElement('div');
      ctaBannerDiv.className = 'carousel-banner-banner-cta';
      ctaWrapper.append(ctaBannerDiv);

      const textCenterDiv = document.createElement('div');
      textCenterDiv.className = 'carousel-text-center';
      ctaBannerDiv.append(textCenterDiv);

      const ctaLink = document.createElement('a');
      ctaLink.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
      ctaLink.className = 'carousel-cmp-button carousel-analytics_cta_click carousel-text-center carousel-cta-layout';
      ctaLink.setAttribute('data-link-region', 'CTA');
      ctaLink.setAttribute('data-is-internal', 'true');
      ctaLink.setAttribute('data-enable-gating', 'false');
      ctaLink.href = ctaUrl.href;
      ctaLink.target = '_blank';

      const ctaSpan = document.createElement('span');
      ctaSpan.className = 'carousel-cmp-button__text carousel-primary-btn carousel-w-75 carousel-p-5 carousel-rounded-pill carousel-d-inline-flex carousel-justify-content-center carousel-align-items-center carousel-famlf-cta-btn';
      ctaSpan.textContent = ctaLabel;
      ctaLink.append(ctaSpan);
      textCenterDiv.append(ctaLink);

      const popUpDiv = document.createElement('div');
      popUpDiv.className = 'carousel-pop-up carousel-d-none';
      popUpDiv.innerHTML = '<input type="hidden" class="carousel-popup-message"/><input type="hidden" class="carousel-proceed-button-label"/><input type="hidden" class="carousel-cancel-button-label"/><input type="hidden" class="carousel-background-color"/>';
      textCenterDiv.append(popUpDiv);
    }

    swiperWrapper.append(slide);
  });

  // Add carousel actions (previous, next, pause, play buttons)
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'carousel-cmp-carousel__actions';
  actionsDiv.innerHTML = `
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
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--play carousel-cmp-carousel__action--disabled" type="button" aria-label="Play" data-cmp-hook-carousel="play" disabled="">
        <span class="carousel-cmp-carousel__action-icon"></span>
        <span class="carousel-cmp-carousel__action-text">Play</span>
    </button>
  `;
  swiperWrapper.append(actionsDiv);

  // Add swiper container with navigation buttons
  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'carousel-swiper-container';
  swiperContainer.innerHTML = `
    <div>
        <button class="carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click carousel-disabled" disabled="">
            /content/dam/aemigrate/uploaded-folder/image/1772510914587.svg+xml
        </button>
    </div>
    <div>
        <button class="carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click">
            /content/dam/aemigrate/uploaded-folder/image/1772510914672.svg+xml
        </button>
    </div>
  `;
  carouselSwiper.append(swiperContainer);

  // Add pagination
  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'carousel-swiper-pagination carousel-primary-swiper-pagination carousel-pagination-set carousel-mb-md-8 carousel-mb-10 carousel-mt-6 carousel-position-absolute carousel-swiper-pagination-clickable carousel-swiper-pagination-bullets carousel-swiper-pagination-horizontal';
  // Need to dynamically add bullets based on the number of slides
  [...block.children].forEach((_, index) => {
    const bullet = document.createElement('span');
    bullet.className = 'carousel-swiper-pagination-bullet';
    if (index === 1) { // Assuming the second slide is active by default based on example HTML
      bullet.classList.add('carousel-swiper-pagination-bullet-active');
    }
    paginationDiv.append(bullet);
  });
  carouselSwiper.append(paginationDiv);

  block.textContent = '';
  block.append(carouselSwiper);
}