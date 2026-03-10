import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselPositionRelative = document.createElement('div');
  carouselPositionRelative.classList.add('carousel-position-relative');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'carousel-primary-swiper');
  // Add static attributes from the HTML
  swiper.setAttribute('role', 'group');
  swiper.setAttribute('aria-live', 'polite');
  swiper.setAttribute('aria-roledescription', 'carousel');
  swiper.setAttribute('data-is-autoplay', 'true'); // Assuming default true, adjust if dynamic
  swiper.setAttribute('data-delay', '5000'); // Assuming default, adjust if dynamic
  swiper.setAttribute('data-autopause-disabled', 'true'); // Assuming default, adjust if dynamic
  swiper.setAttribute('data-is-loop', 'false'); // Assuming default, adjust if dynamic
  swiper.setAttribute('data-placeholder-text', 'false'); // Assuming default, adjust if dynamic

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  [...block.children].forEach((row) => {
    const slide = document.createElement('div');
    moveInstrumentation(row, slide);
    slide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-roledescription', 'slide');

    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('banner');

    const bannerSection = document.createElement('section');
    bannerSection.classList.add('banner-section');

    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('carousel-position-relative', 'carousel-boing', 'banner-section__wrapper');

    const cells = [...row.children];

    // Check for video first
    const videoCell = cells[0]; // Assuming video is in the first cell if present
    const video = videoCell ? videoCell.querySelector('video') : null;

    if (video) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');

      const newVideo = document.createElement('video');
      newVideo.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      newVideo.setAttribute('title', video.getAttribute('title') || 'Video');
      newVideo.setAttribute('aria-label', video.getAttribute('aria-label') || 'Video');
      newVideo.setAttribute('data-is-autoplay', video.getAttribute('data-is-autoplay') || 'true');
      newVideo.setAttribute('playsinline', '');
      newVideo.setAttribute('preload', 'metadata');
      newVideo.setAttribute('fetchpriority', 'high');
      newVideo.setAttribute('loop', video.getAttribute('loop') || 'false');
      newVideo.setAttribute('muted', video.getAttribute('muted') || 'true');
      newVideo.setAttribute('autoplay', video.getAttribute('autoplay') || 'true');

      const source = document.createElement('source');
      source.src = video.querySelector('source').src;
      source.type = video.querySelector('source').type;
      newVideo.append(source);
      videoWrapper.append(newVideo);

      // Add play/pause and mute/unmute buttons if they exist in the original HTML
      const playPauseWrapper = videoCell.querySelector('.carousel-position-absolute.carousel-w-100.carousel-h-100');
      if (playPauseWrapper) {
        videoWrapper.append(playPauseWrapper.cloneNode(true)); // Clone to retain structure and content
      }

      const muteIconWrapper = videoCell.querySelector('.carousel-position-absolute.carousel-z-2');
      if (muteIconWrapper) {
        videoWrapper.append(muteIconWrapper.cloneNode(true)); // Clone to retain structure and content
      }

      wrapperDiv.append(videoWrapper);
    } else {
      // If no video, check for image
      const imageCell = cells[0]; // Assuming image is in the first cell if present
      const img = imageCell ? imageCell.querySelector('img') : null;
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
        optimizedPic.querySelector('img').setAttribute('loading', img.getAttribute('loading') || 'eager');
        optimizedPic.querySelector('img').setAttribute('fetchpriority', img.getAttribute('fetchpriority') || 'high');
        optimizedPic.querySelector('img').setAttribute('decoding', img.getAttribute('decoding') || 'async');
        wrapperDiv.append(optimizedPic);
      }
    }

    // Handle CTA Link
    const ctaCell = cells[1]; // Assuming CTA is in the second cell
    const ctaLink = ctaCell ? ctaCell.querySelector('a') : null;

    if (ctaLink) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

      const bannerCtaDiv = document.createElement('div');
      bannerCtaDiv.classList.add('banner-cta');

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('carousel-text-center');

      const newCtaLink = document.createElement('a');
      newCtaLink.id = ctaLink.id;
      newCtaLink.classList.add('cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      newCtaLink.setAttribute('data-link-region', ctaLink.getAttribute('data-link-region') || 'CTA');
      newCtaLink.setAttribute('data-is-internal', ctaLink.getAttribute('data-is-internal') || 'true');
      newCtaLink.setAttribute('data-enable-gating', ctaLink.getAttribute('data-enable-gating') || 'false');
      newCtaLink.href = ctaLink.href;
      newCtaLink.target = ctaLink.target;

      const ctaSpan = document.createElement('span');
      ctaSpan.classList.add('cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      ctaSpan.textContent = ctaLink.textContent.trim();
      newCtaLink.append(ctaSpan);

      const popupDiv = document.createElement('div');
      popupDiv.classList.add('carousel-pop-up', 'carousel-d-none');
      popupDiv.innerHTML = `
        <input type="hidden" class="carousel-popup-message">
        <input type="hidden" class="carousel-proceed-button-label">
        <input type="hidden" class="carousel-cancel-button-label">
        <input type="hidden" class="carousel-background-color">
      `;

      textCenterDiv.append(newCtaLink, popupDiv);
      bannerCtaDiv.append(textCenterDiv);
      ctaWrapper.append(bannerCtaDiv);
      wrapperDiv.append(ctaWrapper);
    }

    bannerSection.append(wrapperDiv);
    bannerDiv.append(bannerSection);
    slide.append(bannerDiv);
    swiperWrapper.append(slide);
  });

  swiper.append(swiperWrapper);

  // Add navigation and pagination elements from the HTML
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
  swiper.append(actionsDiv);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('carousel-swiper-container');
  swiperContainer.innerHTML = `
    <div>
        <button class="carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click carousel-disabled" disabled="">
            /content/dam/aemigrate/uploaded-folder/image/1773134913601.svg+xml
        </button>
    </div>
    <div>
        <button class="carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click">
            /content/dam/aemigrate/uploaded-folder/image/1773134913693.svg+xml
        </button>
    </div>
  `;
  swiper.append(swiperContainer);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  // Add initial bullets based on the number of slides
  for (let i = 0; i < block.children.length; i++) {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    if (i === 0) { // Assuming the first slide is active initially
      bullet.classList.add('swiper-pagination-bullet-active');
    }
    paginationDiv.append(bullet);
  }
  swiper.append(paginationDiv);

  carouselPositionRelative.append(swiper);
  block.textContent = '';
  block.append(carouselPositionRelative);
}
