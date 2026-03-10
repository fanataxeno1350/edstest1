import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselPositionRelative = document.createElement('div');
  carouselPositionRelative.className = 'carousel-position-relative';

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
  swiperWrapper.style.transitionDuration = '0ms';
  swiperWrapper.style.transform = 'translate3d(-508px, 0px, 0px)';
  swiperWrapper.style.transitionDelay = '0ms';

  [...block.children].forEach((row, index) => {
    const slide = document.createElement('div');
    moveInstrumentation(row, slide);
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.className = `carousel-swiper-slide carousel-primary-swiper-slide ${index === 0 ? 'carousel-swiper-slide-prev' : 'carousel-swiper-slide-active'}`;
    slide.style.width = '508px';

    const bannerDiv = document.createElement('div');
    bannerDiv.className = 'carousel-banner';

    const section = document.createElement('section');
    section.className = 'carousel-banner-section';

    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'carousel-position-relative carousel-boing carousel-banner-section__wrapper';

    const cells = [...row.children];
    const videoCell = cells[0];
    const imageCell = cells[1];
    const altCell = cells[2];
    const ctaTextCell = cells[3];
    const ctaHrefCell = cells[4];

    const video = videoCell.querySelector('a');
    const image = imageCell.querySelector('img');
    const alt = altCell ? altCell.textContent.trim() : '';
    const ctaText = ctaTextCell ? ctaTextCell.textContent.trim() : '';
    const ctaHref = ctaHrefCell ? ctaHrefCell.textContent.trim() : '';

    if (video) {
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'carousel-video-wrapper';

      const videoElement = document.createElement('video');
      videoElement.className = 'carousel-w-100 carousel-object-fit-cover carousel-banner-media carousel-banner-video';
      videoElement.title = 'Video';
      videoElement.ariaLabel = 'Video';
      videoElement.setAttribute('data-is-autoplay', 'true');
      videoElement.playsInline = true;
      videoElement.preload = 'metadata';
      videoElement.fetchPriority = 'high';
      videoElement.loop = false;
      videoElement.muted = true;
      videoElement.autoplay = true;

      const source = document.createElement('source');
      source.src = video.href;
      source.type = 'video/mp4';
      videoElement.append(source);
      videoWrapper.append(videoElement);

      const playPauseOverlay = document.createElement('div');
      playPauseOverlay.className = 'carousel-position-absolute carousel-w-100 carousel-h-100 carousel-start-0 carousel-top-0 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer';

      const playButton = document.createElement('button');
      playButton.type = 'button';
      playButton.className = 'carousel-d-none carousel-video-icon carousel-icon-play carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      playButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773138350907.svg+xml'; // Placeholder for SVG

      const pauseButton = document.createElement('button');
      pauseButton.type = 'button';
      pauseButton.className = 'carousel-d-block carousel-video-icon carousel-icon-pause carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      pauseButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773138350940.svg+xml'; // Placeholder for SVG

      playPauseOverlay.append(playButton, pauseButton);
      videoWrapper.append(playPauseOverlay);

      const muteIcon = document.createElement('div');
      muteIcon.className = 'carousel-position-absolute carousel-z-2 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer carousel-mute-icon';

      const muteButton = document.createElement('button');
      muteButton.type = 'button';
      muteButton.className = 'carousel-video-icon-volume carousel-icon-mute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none';
      muteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773138350994.svg+xml'; // Placeholder for SVG

      const unmuteButton = document.createElement('button');
      unmuteButton.type = 'button';
      unmuteButton.className = 'carousel-video-icon-volume carousel-icon-unmute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none';
      unmuteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773138351066.svg+xml'; // Placeholder for SVG

      const noAudioButton = document.createElement('button');
      noAudioButton.type = 'button';
      noAudioButton.className = 'carousel-video-icon-volume carousel-no-audio-icon carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      noAudioButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773138351139.svg+xml'; // Placeholder for SVG

      muteIcon.append(muteButton, unmuteButton, noAudioButton);
      videoWrapper.append(muteIcon);

      wrapperDiv.append(videoWrapper);
    } else if (image) {
      const optimizedPic = createOptimizedPicture(image.src, alt || image.alt);
      optimizedPic.querySelector('img').className = 'carousel-w-100 carousel-h-100 carousel-object-fit-cover carousel-banner-media carousel-banner-image';
      optimizedPic.querySelector('img').loading = 'eager';
      optimizedPic.querySelector('img').fetchPriority = 'high';
      optimizedPic.querySelector('img').decoding = 'async';
      moveInstrumentation(image, optimizedPic.querySelector('img'));
      wrapperDiv.append(optimizedPic);
    }

    if (ctaText && ctaHref) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.className = 'carousel-position-absolute carousel-start-50 carousel-translate-middle-x carousel-w-100 carousel-boing__banner--cta';

      const bannerCta = document.createElement('div');
      bannerCta.className = 'carousel-banner-cta';

      const textCenterDiv = document.createElement('div');
      textCenterDiv.className = 'carousel-text-center';

      const ctaLink = document.createElement('a');
      ctaLink.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
      ctaLink.className = 'carousel-cmp-button carousel-analytics_cta_click carousel-text-center carousel-cta-layout';
      ctaLink.setAttribute('data-link-region', 'CTA');
      ctaLink.setAttribute('data-is-internal', 'true');
      ctaLink.setAttribute('data-enable-gating', 'false');
      ctaLink.href = ctaHref;
      ctaLink.target = '_blank';

      const ctaSpan = document.createElement('span');
      ctaSpan.className = 'carousel-cmp-button__text carousel-primary-btn carousel-w-75 carousel-p-5 carousel-rounded-pill carousel-d-inline-flex carousel-justify-content-center carousel-align-items-center carousel-famlf-cta-btn';
      ctaSpan.textContent = ctaText;

      ctaLink.append(ctaSpan);
      textCenterDiv.append(ctaLink);

      const popupDiv = document.createElement('div');
      popupDiv.className = 'carousel-pop-up carousel-d-none';
      popupDiv.innerHTML = '<input type="hidden" class="carousel-popup-message"><input type="hidden" class="carousel-proceed-button-label"><input type="hidden" class="carousel-cancel-button-label"><input type="hidden" class="carousel-background-color">';
      textCenterDiv.append(popupDiv);

      bannerCta.append(textCenterDiv);
      ctaWrapper.append(bannerCta);
      wrapperDiv.append(ctaWrapper);
    }

    section.append(wrapperDiv);
    bannerDiv.append(section);
    slide.append(bannerDiv);
    swiperWrapper.append(slide);
  });

  carouselSwiper.append(swiperWrapper);

  // Add static navigation buttons and pagination
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
  carouselSwiper.append(actionsDiv);

  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'carousel-swiper-container';
  swiperContainer.innerHTML = `
    <div>
        <button class="carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click carousel-disabled" disabled="">
            /content/dam/aemigrate/uploaded-folder/image/1773138351188.svg+xml
        </button>
    </div>
    <div>
        <button class="carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click">
            /content/dam/aemigrate/uploaded-folder/image/1773138351237.svg+xml
        </button>
    </div>
  `;
  carouselSwiper.append(swiperContainer);

  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'carousel-swiper-pagination carousel-primary-swiper-pagination carousel-pagination-set carousel-mb-md-8 carousel-mb-10 carousel-mt-6 carousel-position-absolute carousel-swiper-pagination-clickable carousel-swiper-pagination-bullets carousel-swiper-pagination-horizontal';
  paginationDiv.innerHTML = '<span class="carousel-swiper-pagination-bullet"></span><span class="carousel-swiper-pagination-bullet carousel-swiper-pagination-bullet-active"></span>';
  carouselSwiper.append(paginationDiv);

  carouselPositionRelative.append(carouselSwiper);

  block.textContent = '';
  block.append(carouselPositionRelative);
}