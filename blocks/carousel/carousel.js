import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselPositionRelative = document.createElement('div');
  carouselPositionRelative.classList.add('carousel-position-relative');

  const carouselSwiper = document.createElement('div');
  carouselSwiper.classList.add('carousel-swiper', 'carousel-primary-swiper', 'carousel-primary-swiper-carousel-419d8524f7', 'carousel-swiper-initialized', 'carousel-swiper-horizontal', 'carousel-swiper-backface-hidden');
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
  swiperWrapper.classList.add('carousel-swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');
  swiperWrapper.style.transitionDuration = '0ms';
  swiperWrapper.style.transform = 'translate3d(-508px, 0px, 0px)';
  swiperWrapper.style.transitionDelay = '0ms';

  [...block.children].forEach((row) => {
    const slideDiv = document.createElement('div');
    moveInstrumentation(row, slideDiv);
    slideDiv.classList.add('carousel-swiper-slide', 'carousel-primary-swiper-slide');
    slideDiv.setAttribute('role', 'tabpanel');
    slideDiv.setAttribute('aria-roledescription', 'slide');
    slideDiv.style.width = '508px';

    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('carousel-banner');

    const section = document.createElement('section');
    section.classList.add('carousel-banner-section');

    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const ctaDiv = document.createElement('div');
    ctaDiv.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');
    const bannerCtaDiv = document.createElement('div');
    bannerCtaDiv.classList.add('carousel-banner-cta');
    ctaDiv.append(bannerCtaDiv);

    const videoSrc = row.children[0].textContent.trim();
    const imageSrc = row.children[1].textContent.trim();
    const imageAlt = row.children[2].textContent.trim();
    const ctaText = row.children[3].textContent.trim();
    const ctaHref = row.children[4].textContent.trim();

    if (videoSrc) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');
      const video = document.createElement('video');
      video.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      video.title = 'Video';
      video.ariaLabel = 'Video';
      video.setAttribute('data-is-autoplay', 'true');
      video.playsInline = true;
      video.preload = 'metadata';
      video.fetchPriority = 'high';
      video.loop = false;
      video.muted = true;
      video.autoplay = true;
      const source = document.createElement('source');
      source.src = videoSrc;
      source.type = 'video/mp4';
      video.append(source);
      videoWrapper.append(video);

      const controlsDiv = document.createElement('div');
      controlsDiv.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');
      const playButton = document.createElement('button');
      playButton.type = 'button';
      playButton.classList.add('carousel-d-none', 'carousel-video-icon', 'carousel-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      playButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773138350907.svg+xml';
      const pauseButton = document.createElement('button');
      pauseButton.type = 'button';
      pauseButton.classList.add('carousel-d-block', 'carousel-video-icon', 'carousel-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      pauseButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773138350940.svg+xml';
      controlsDiv.append(playButton, pauseButton);
      videoWrapper.append(controlsDiv);

      const muteIconDiv = document.createElement('div');
      muteIconDiv.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');
      const muteButton = document.createElement('button');
      muteButton.type = 'button';
      muteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      muteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773138350994.svg+xml';
      const unmuteButton = document.createElement('button');
      unmuteButton.type = 'button';
      unmuteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      unmuteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773138351066.svg+xml';
      const noAudioButton = document.createElement('button');
      noAudioButton.type = 'button';
      noAudioButton.classList.add('carousel-video-icon-volume', 'carousel-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      noAudioButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1773138351139.svg+xml';
      muteIconDiv.append(muteButton, unmuteButton, noAudioButton);
      videoWrapper.append(muteIconDiv);

      wrapperDiv.append(videoWrapper);
    } else if (imageSrc) {
      const img = createOptimizedPicture(imageSrc, imageAlt);
      img.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
      img.querySelector('img').loading = 'eager';
      img.querySelector('img').fetchPriority = 'high';
      img.querySelector('img').decoding = 'async';
      wrapperDiv.append(img);
    }

    if (ctaText && ctaHref) {
      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('carousel-text-center');
      const ctaLink = document.createElement('a');
      ctaLink.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
      ctaLink.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      ctaLink.setAttribute('data-link-region', 'CTA');
      ctaLink.setAttribute('data-is-internal', 'true');
      ctaLink.setAttribute('data-enable-gating', 'false');
      ctaLink.href = ctaHref;
      ctaLink.target = '_blank';
      const span = document.createElement('span');
      span.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      span.textContent = ctaText;
      ctaLink.append(span);
      textCenterDiv.append(ctaLink);

      const popUpDiv = document.createElement('div');
      popUpDiv.classList.add('carousel-pop-up', 'carousel-d-none');
      popUpDiv.innerHTML = '<input type="hidden" class="carousel-popup-message"><input type="hidden" class="carousel-proceed-button-label"><input type="hidden" class="carousel-cancel-button-label"><input type="hidden" class="carousel-background-color">';
      textCenterDiv.append(popUpDiv);

      bannerCtaDiv.append(textCenterDiv);
    }

    wrapperDiv.append(ctaDiv);
    section.append(wrapperDiv);
    bannerDiv.append(section);
    slideDiv.append(bannerDiv);
    swiperWrapper.append(slideDiv);
  });

  carouselSwiper.append(swiperWrapper);

  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('carousel-cmp-carousel__actions');
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
  swiperContainer.classList.add('carousel-swiper-container');
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
  paginationDiv.classList.add('carousel-swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'carousel-swiper-pagination-clickable', 'carousel-swiper-pagination-bullets', 'carousel-swiper-pagination-horizontal');
  paginationDiv.innerHTML = '<span class="carousel-swiper-pagination-bullet"></span><span class="carousel-swiper-pagination-bullet carousel-swiper-pagination-bullet-active"></span>';
  carouselSwiper.append(paginationDiv);

  carouselPositionRelative.append(carouselSwiper);

  block.textContent = '';
  block.append(carouselPositionRelative);
}
